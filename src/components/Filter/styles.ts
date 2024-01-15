import styled, { css } from "styled-components/native";
import { TouchableOpacity } from 'react-native'

export type FilterStyleProps = {
    isActive?: boolean;
}

export const Container = styled(TouchableOpacity) <FilterStyleProps>`
    ${({ theme, isActive }) => isActive && css`
        border: 1px solid ${theme.COLORS.GREEN_700};
    `};

    border-radius: 4px;
    margin-left: 12px;

    height: 38px;
    width: 70px;

    align-items: center;
    justify-content: center;

    margin-top: 8px;
`;

export const Title = styled.Text`
    text-transform: uppercase;
    ${({ theme}) =>  css`
       font-family: ${theme.FONT_FAMILY.BOLD};
       font-size: ${theme.FONT_SIZE.SM}px;
       color: ${theme.COLORS.WHITE};
    `};
`;