import { createContext } from 'react';
import AuthService from '../src/Services/AuthService';

export const UserContext = createContext(AuthService.getCurrentUser());
