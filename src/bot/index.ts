import { type Context, Telegraf, session } from 'telegraf';

import { CancelCommand } from './commands/cancel';
import { CreateCommand } from './commands/create';
import { StartCommand } from './commands/start';
import { logMiddleware } from './middlwares/log';

interface SessionData {
  currentMethod: 'create' | null;
  currentStep: number;
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
    ctx.session ??= { currentMethod: null, currentStep: 0 };

    const { currentMethod, currentStep } = ctx.session;
    if (currentMethod === 'create') {
      ctx.session.currentStep += 1;

      if (currentStep === 1) {
        await ctx.reply('When will it happen?');
        return;
      }

      if (currentStep === 2) {
        await ctx.reply('Where?');
        return;
      }

      if (currentStep === 3) {
        ctx.session.currentMethod = null;
        ctx.session.currentStep = 0;

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
