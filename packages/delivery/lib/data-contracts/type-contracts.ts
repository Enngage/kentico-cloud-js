import { IElementContract, IElementOptionContract } from './shared/elements.interface';
import { IPaginationContract } from './shared/ipagination.interface';

export namespace TypeContracts {

    export interface IContentTypeSystemAttributesContract {
        id: string;
        name: string;
        codename: string;
        last_modified: Date;
    }

    export interface IContentTypeContract {
        system: IContentTypeSystemAttributesContract;
        elements: IElementContract[];
    }

    export interface ITypesResponseContract {
        types: IContentTypeContract[];
        pagination: IPaginationContract;
    }

    export interface ITypeResponseContract {
        system: IContentTypeSystemAttributesContract;
        elements: IContentTypeElementContract[];
    }

    export interface IContentTypeElementContract {
        codename: string;
        type: string;
        name: string;
        taxonomy_group?: string;
        options?: IElementOptionContract[];
    }
}