export interface DetailDataType {
  id: any;
  data: {
    data: any;
    id: number;
    title: string;
    nickname: string;
    destination: string;
    tripDate: {
      startDate: string;
      endDate: string;
    };
    numberOfPeople: number;
    gender: string;
    content: string;
    status: string;
    tag: string[];
    thumbnail: {
      id: number;
      url: string;
    };
    images: {
      id: number;
      url: string;
    }[];
    countOfComments: number;
    countOfBookmarks: number;
  };
}

export interface RecruitmentProps extends DetailDataType {
  recruitRef: (node?: Element | null) => void;
}

export interface DestinationProps extends DetailDataType {
  destinationRef: (node?: Element | null) => void;
}

export interface CommentProps extends DetailDataType {
  commentRef: (node?: Element | null) => void;
}
