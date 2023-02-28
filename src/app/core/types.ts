import type {Block} from '~/app/core/Block';

export type Props = {
    tagName: string;
    id: string;
    isNeedInternalId?: boolean;
    blockEvents?: BlockEvents
    blockPropsAndChildren: BlockPropsAndChildren;
};

export type BlockProps = Record<string, any>;

export type BlockPropsAndChildren = Record<string, any>;

export type BlockEvents = Record<string, () => any>;

export type BlockChildren = Record<string, Block | Block[]>;
