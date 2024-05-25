import { type Context, Telegraf, session } from 'telegraf';

import { addEvent } from '../scheduleEvents';

import { CancelCommand } from './commands/cancel';
import { CreateCommand } from './commands/create';
import { StartCommand } from './commands/start';
import { logMiddleware } from './middlwares/log';

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

// Define your own context type
interface MyContext extends Context {
  session?: SessionData;
  // ... more props go here
}

export function createBot(token: string) {
  const startCommand = new StartCommand();
  const createCommand = new CreateCommand();
  const cancelCommand = new CancelCommand();

  const bot = new Telegraf<MyContext>(token);

  bot.use(session());

  bot.use(logMiddleware);

  bot.start(startCommand.execute);
  bot.command('create', createCommand.execute);
  bot.command('cancel', cancelCommand.execute);

  bot.on('message', async (ctx) => {
    ctx.session ??= {
      currentMethod: null,
      currentStep: 0,
      createData: { title: null, when: null, untilWhen: null, location: null },
    };

    const { currentMethod, currentStep } = ctx.session;
    if (currentMethod === 'create') {
      ctx.session.currentStep += 1;

      if (currentStep === 1) {
        if ('text' in ctx.message) {
          ctx.session.createData.title = ctx.message.text;
        }

        await ctx.reply('When will it happen?');
        return;
      }

      if (currentStep === 2) {
        if ('text' in ctx.message) {
          ctx.session.createData.untilWhen = ctx.message.text;
        }

        await ctx.reply('Until when?');
        return;
      }

      if (currentStep === 3) {
        if ('text' in ctx.message) {
          ctx.session.createData.when = ctx.message.text;
        }

        await ctx.reply('Where?');
        return;
      }

      if (currentStep === 4) {
        if ('text' in ctx.message) {
          ctx.session.createData.location = ctx.message.text;
        }
        console.log(ctx.session.createData);

        addEvent(ctx.session.createData);

        ctx.session.currentMethod = null;
        ctx.session.currentStep = 0;
        ctx.session.createData = {
          title: null,
          when: null,
          untilWhen: null,
          location: null,
        };

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
