import { type Context, Telegraf, session } from 'telegraf';

import { CONFIG } from '../config';

import { addEvent } from '../events';

import { CancelCommand } from './commands/cancel';
import { CreateCommand } from './commands/create';
import { StartCommand } from './commands/start';
import { logMiddleware } from './middlwares/log';
import { defaultSession } from './session';

interface SessionData {
  currentMethod: 'create' | null;
  currentStep: number;
  createData: {
    title: string | null;
    when: string | null;
    untilWhen: string | null;
    location: string | null;
  };
}

interface MyContext extends Context {
  session?: SessionData;
}

export function createBot(token: string) {
  const startCommand = new StartCommand();
  const createCommand = new CreateCommand();
  const cancelCommand = new CancelCommand();

  const bot = new Telegraf<MyContext>(token);

  bot.use(session({ defaultSession: () => defaultSession }));
  bot.use(logMiddleware);

  bot.start(startCommand.execute);
  bot.command('create', createCommand.execute);
  bot.command('cancel', cancelCommand.execute);

  bot.on('message', async (ctx) => {
    if (!('text' in ctx.message)) return;

    const { currentMethod, currentStep } = ctx.session;

    if (currentMethod === 'create') {
      ctx.session.currentStep += 1;

      if (currentStep === 1) {
        ctx.session.createData.title = ctx.message.text;
        await ctx.reply('When will it happen?');
        return;
      }

      if (currentStep === 2) {
        ctx.session.createData.untilWhen = ctx.message.text;
        await ctx.reply('Until when?');
        return;
      }

      if (currentStep === 3) {
        ctx.session.createData.when = ctx.message.text;
        await ctx.reply('Where?');
        return;
      }

      if (currentStep === 4) {
        ctx.session.createData.location = ctx.message.text;

        notifyAdmin(ctx.session.createData, bot);
        addEvent(ctx.session.createData);

        ctx.session = defaultSession;

        await ctx.reply(
          'Thanks! Your event is now created and should show up on the screen in a few moments.',
        );
        return;
      }
    }

    await ctx.reply('To create an event, please run /create 🌱');
  });

  return bot;
}

const notifyAdmin = (data, bot) => {
  return bot.telegram.sendMessage(
    CONFIG.bot.adminId,
    `New event created! 🎉


${JSON.stringify(data, null, 2)}`,
  );
};
