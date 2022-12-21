import { createContext } from 'react';
import AuthService from '../Services/AuthService';

export const UserContext = createContext(AuthService.getCurrentUser());
