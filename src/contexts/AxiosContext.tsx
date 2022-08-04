import { ITree } from '@utils/models';
import axios, { AxiosInstance } from 'axios';
import { createContext, ReactNode, useContext } from 'react';
import { familyTree as familyTreeData } from '@assets/data/familyTree';

export interface IAxiosContext {
  apiClient: AxiosInstance;
  getFamilyTree: () => Promise<ITree[] | null>;
}

const DefaultValues: IAxiosContext = {
  apiClient: axios,
  getFamilyTree: function (): Promise<ITree[] | null> {
    throw new Error('Function not implemented.');
  }
};

const AxiosContext = createContext<IAxiosContext>(DefaultValues);

export function useAxios() {
  return useContext(AxiosContext);
}

interface IProps {
  children: ReactNode;
}

export function AxiosProvider({ children }: IProps) {
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const getFamilyTree = async (): Promise<ITree[] | null> => {
    // Data can be from a api
    return familyTreeData;
  };

  const value = {
    apiClient,
    getFamilyTree
  };

  return (
    <AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
  );
}
