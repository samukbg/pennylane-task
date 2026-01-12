declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  Home: undefined;
  Editor: undefined;
  InvoiceDetail: { id: number };
  InvoiceEdit: { id: number };
};

export type InvoiceDetailScreenRouteProp = RouteProp<RootStackParamList, 'InvoiceDetail'>;
export type InvoiceEditScreenRouteProp = RouteProp<RootStackParamList, 'InvoiceEdit'>;