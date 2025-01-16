export {};

declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null;

  type KeyValuePair = {
    [key: string]: any;
  };

  interface IBase extends Record<string, unkonwn> {
    _id?: string | number;
  }

  interface IAdmin extends IBase {
    id?: string;
    email: string;
    password: string;
  }

  interface IWallet extends IBase {
    walletAddress: string;
    name?: string;
    username?: string;
  }

  interface ICoin {
    coinName: string;
    address: string;
    proportion: number;
  }

  interface IGroupCoin extends IBase {
    name: string;
    coins: ICoin[] | [];
    imageUrl?: string;
    visitCount?: number;
    description: string;
    file: any;
    faq: IFaq[] | [];
  }

  interface IFaq {
    question: string;
    answer: string;
  }

  interface Option {
    value: string;
    label: string;
    icon: string;
    proportion: number;
  }
  interface WalletOption {
    collector: string;
    weight: number;
  }
}
