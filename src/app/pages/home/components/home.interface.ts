export interface speakerInterface {
  id: string,
  href: string,
  data: {
    name: string,
    value: string,
    is_editing: boolean,
    is_checked: boolean,
  }[]
};

export interface speakerDetailInterface {
  id: string,
  value: string
};

export interface speakerSessionsInterface {
  id: string,
  list?: {
    data: {
      name: string,
      value: string
    }[]
  }[]
};