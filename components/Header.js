import React from 'react'


import {
    HeaderView,
    HeaderTitle,
    HeaderButton,
    HeaderIcons,
    HeaderUser,
    HeaderUserIcon,
    colors
} from '../styles/appStyles';

import { Entypo, Fontisto } from "@expo/vector-icons";

const Header = ({ clearDoneTodos, logout, user }) => {
    const computedUser = user && user.login
    return (
        <HeaderView>
            <HeaderTitle>
                <Fontisto name="checkbox-active" size={23} color={colors.tertiary} />
                Tudusy
            </HeaderTitle>
            <HeaderIcons>
                <HeaderButton>
                    <Entypo name="trash" onPress={clearDoneTodos} size={25} color={colors.tertiary} />
                </HeaderButton>
                <HeaderUserIcon>
                    <Entypo name="user" onPress={clearDoneTodos} size={20} color={colors.tertiary} />
                </HeaderUserIcon>
                <HeaderUser>
                    {computedUser}
                </HeaderUser>
                <HeaderButton>
                    <Entypo name="log-out" onPress={logout} size={25} color={colors.tertiary} />
                </HeaderButton>
            </HeaderIcons>
        </HeaderView>
    );
}

export default Header;