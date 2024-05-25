import { type Context } from 'telegraf';
import { type Update } from 'telegraf/typings/core/types/typegram';

import { defaultSession } from '../session';

import { type ICommand } from './types';

export class CancelCommand implements ICommand {
  public execute = async (ctx: Context<Update>): Promise<void> => {
    ctx.session = defaultSession;

    await ctx.reply('Canceled all operations');
  };
}
