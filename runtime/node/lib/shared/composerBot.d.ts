import { ResourceExplorer } from "botbuilder-dialogs-declarative";
export declare class ComposerBot {
    private dialogManager;
    private readonly resourceExplorer;
    private readonly rootDialogPath;
    constructor(resourceExplorer: ResourceExplorer, rootDialog: string, settings: any);
    private loadRootDialog;
    onTurn: (context: any) => Promise<void>;
}
