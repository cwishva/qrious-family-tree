export interface ITree {
  id: number;
  name: string;
  children: number[];
  gender: string;
  parents: number[];
}

export interface INode {
  key: string;
  name: string;
  gender: string;
  children?: INode[];
  link?: INode;
}