import {
  BaseColumn,
  DduItem,
} from "https://deno.land/x/ddu_vim@v3.8.1/types.ts";
import { GetTextResult } from "https://deno.land/x/ddu_vim@v3.8.1/base/column.ts";
import { Denops, fn } from "https://deno.land/x/ddu_vim@v3.8.1/deps.ts";

type Params = {
  collapsedIcon: string;
  expandedIcon: string;
  checkedIcon: string;
  uncheckedIcon: string;
  noteIcon: string;
  iconWidth: number;
  indentWidth: number;
};

type ActionData = {
  title: string;
  isFolder: boolean;
  is_todo: boolean;
  todo_completed: boolean;
  todo_due: boolean;
};

export class Column extends BaseColumn<Params> {
  override async getLength(args: {
    denops: Denops;
    columnParams: Params;
    items: DduItem[];
  }): Promise<number> {
    const params = args.columnParams;
    const widths = await Promise.all(args.items.map(
      async (item) => {
        const len = await fn.strwidth(
          args.denops,
          " ".repeat(
            params.indentWidth * item.__level + params.iconWidth,
          ) + item.word,
        ) as number;
        return len;
      },
    )) as number[];

    return Math.max(...widths);
  }

  override getText(args: {
    denops: Denops;
    columnParams: Params;
    startCol: number;
    endCol: number;
    item: DduItem;
  }): Promise<GetTextResult> {
    const params = args.columnParams;
    const actionData = args.item?.action as ActionData;

    const isFolder = args.item.isTree ?? false;

    const folderIcon = args.item.__expanded
      ? params.expandedIcon
      : params.collapsedIcon;
    const noteIcon = actionData.is_todo
      ? actionData.todo_completed ? params.checkedIcon : params.uncheckedIcon
      : params.noteIcon;

    const icon = isFolder ? folderIcon : noteIcon;

    return Promise.resolve({
      text: " ".repeat(params.indentWidth * args.item.__level) + icon + " " +
        args.item.word,
    });
  }
  override params(): Params {
    return {
      collapsedIcon: "+",
      expandedIcon: "-",
      checkedIcon: "X",
      uncheckedIcon: "_",
      noteIcon: "*",
      iconWidth: 1,
      indentWidth: 2,
    };
  }
}
