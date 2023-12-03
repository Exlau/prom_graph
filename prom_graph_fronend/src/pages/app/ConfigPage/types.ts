export interface ContainerLabels {
  [key:string]:string;
}

export interface ContainerInfo {
  id: string;
  names: string[];
  state: string;
  labels: ContainerLabels;
  image:string;
  command:string;
  status:string;
}
