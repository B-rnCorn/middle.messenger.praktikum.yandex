import type {Block} from '~/app/core/Block';

export type Props = {
    tagName?: string;
    isNeedInternalId?: boolean;
    id?: string;
    blockEvents?: BlockEvents
    blockPropsAndChildren: BlockPropsAndChildren;
};

export type BlockProps = Record<string, any>;

export type BlockPropsAndChildren = Record<string, any>;

export type BlockEvents = Record<string, (params?: any) => any>;

export type BlockChildren = Record<string, Block | Block[]>;

export enum PropsDefaultFields {
    TAG_NAME = 'tagName',
    ID = 'id',
    IS_NEED_INTERNAL_ID = 'isNeedInternalId',
    BLOCK_EVENTS = 'blockEvents',
}
