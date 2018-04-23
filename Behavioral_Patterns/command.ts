namespace Command {
  class TextContext {
    content = 'text content';
  }

  abstract class TextCommand {
    constructor(
      public context: TextContext
    ) { }

    abstract excute(...args: any[]): void;
  }

  class ReplaceCommand extends TextCommand {
    excute(index: number, length: number, text: string): string {
      let content = this.context.content;

      this.context.content = content.substr(0, index) +
      text +
      content.substr(index + length);

      return this.context.content;
    }
  }

  class InsertCommand extends TextCommand {
    excute(index: number, text: string): string {
      let content = this.context.content;

      this.context.content = content.substr(0, index) +
      text +
      content.substr(index);
      
      return this.context.content;
    }
  }

  class Client {
    private context = new TextContext();

    replaceCommand = new ReplaceCommand(this.context);
    insertCommand = new InsertCommand(this.context);
  }

  let client = new Client();

  const res1 = client.replaceCommand.excute(0, 4, 'the');
  console.log(res1);
  const res2 = client.insertCommand.excute(0, 'awesome ')
  console.log(res2);


  // Macro
  interface TextCommandInfo {
    command: TextCommand;
    args: any[];
  }

  class MacroTextCommand {
    constructor(
      public infos: TextCommandInfo[]
    ) { }

    excute(): void {
      for (let info of this.infos) {
        info.command.excute(...info.args);
      }
    }
  }

  const textMacro = new MacroTextCommand([]);
  textMacro.excute()
}