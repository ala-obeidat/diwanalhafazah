import { UserDto } from "./userDto";
import {TransactionResponse} from "./TransactionResponse"
export interface UserDetails {
    user: UserDto;
    transactions:TransactionResponse[];
}