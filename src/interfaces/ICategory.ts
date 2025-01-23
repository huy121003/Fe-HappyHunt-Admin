interface IAttribute {
  nameVn: string;
  nameEn: string;
  values: string[];
}

interface ICategory {
  _id: string;
  nameVn: string;
  nameEn: string;
  description: string;
  url: string;
  icon: string;
  attributes: IAttribute[];
  parent: string;
}

export default ICategory;
