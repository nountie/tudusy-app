import styled from "styled-components";
import {
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  TextInput,
} from "react-native";

import Constants from "expo-constants";

// Colors
export const colors = {
  primary: "#01579B",
  secondary: "#039BE5",
  tertiary: "#FFF",
  alternative: "#01579B",
};

const statusBarHeight = Constants.statusBarHeight;

export const Container = styled.View`
  background-color: ${colors.primary};
  padding: 0px;
  padding-bottom: 0px;
  flex: 1;
  padding-top: ${statusBarHeight}px;
`;

// Header
export const HeaderView = styled.View`
  padding-vertical: 10px;
  margin-horizontal: 20px;
  margin-bottom: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderIcons = styled.View`
  margin-horizontal: 5px;
  margin-top: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderUser = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: white;
  margin-left: 0px;
`;

export const HeaderUserIcon = styled.Text`
  margin-right: 6px;
  margin-left: 16px;
`;

export const HeaderTitle = styled.Text`
  font-size: 33px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
  font-style: italic;
`;

export const HeaderButton = styled.TouchableOpacity`
  font-weight: bold;
  color: ${colors.tertiary};
  margin-left: 16px;
`;

// List
export const ListContainer = styled.View`
  margin-bottom: 30px;
  flex: 1;
  padding-bottom: 40px;
`;

export const ListView = styled.TouchableHighlight`
  background-color: transparent;
  min-height: 86px;
  margin-horizontal: 20px;
  flex-basis: 100%
  margin-bottom: 16px;
  display: flex;
  justify-content: space-around;
  border-radius: 16px;
`;

export const StyledView = styled.View`
  background-color: ${colors.secondary};
  min-height: 85px;
  width: 80%
  display: flex;
  padding: 15px 18px 15px 25px;
  justify-content: space-around;
  border-radius: 16px;
`;

export const StyledCheck = styled.TouchableOpacity`
  flex-direction: row;
  height: 90px;
  width: 20%;
  padding: 20px;
  background-color: transparent;
  position: absolute;
  right: 0;
  z-index: 99;
`;

export const ListViewHidden = styled.View`
  background-color: ${colors.tertiary};
  margin-horizontal: 20px;
  min-height: 85px;
  padding: 15px 0 15px 15px;
  margin-bottom: 22px;
  margin-top: 4px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-vertical: 0px;
  border-radius: 16px;
  shadow-color: #000;
  shadow-opacity: 0.3;
  shadow-radius: 10px;
  elevation: 12;
`;

export const HiddenButton = styled.TouchableOpacity`
  width: 55px;
  align-items: center;
`;

export const TodoText = styled.Text`
  font-size: 16px;
  letter-spacing: 1px;
  color: ${colors.tertiary};
`;

export const TodoTextCenter = styled.Text`
  font-size: 20px;
  text-align: center;
  letter-spacing: 1px;
  padding-top: 10px;
  color: ${colors.tertiary};
`;

export const TodoDate = styled.Text`
  font-size: 10px;
  letter-spacing: 1px;
  color: ${colors.alternative};
  text-align: right;
  text-transform: uppercase;
`;

// Text for swiped todo row
export const SwipedTodoText = styled(TodoText)`
  color: ${colors.alternative};
  font-style: italic;
  text-decoration: line-through;
`;

// Modal
export const ModalButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${colors.tertiary};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  position: absolute;
  bottom: 25px;
`;

export const ModalContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  background-color: ${colors.primary};
`;

export const ModalView = styled.SafeAreaView`
  background-color: ${colors.secondary};
  border-radius: 18px;
  padding: 5px;
  width: 90%;
  margin: 20px;
  margin-bottom: 120px;
`;

export const ModalTitle = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
  margin-top: 40px;
`;

export const StyledInput = styled.TextInput`
  max-width: 100%;
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
  margin-horizontal: 25px;
`;

export const ModalAction = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background-color: ${(props) => props.color};
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 30px;
`;

export const ModalActionGroup = styled.View`
  flex-direction: row;
  justify-content: space-around;
  margin-top: 30px;
`;

export const ModalIcon = styled.View`
  align-items: center;
  margin-bottom: 30px;
`;

// Login view

export const LoginHeader = styled.Text`
  font-size: 43px;
  font-weight: bold;
  color: ${colors.tertiary};
  letter-spacing: 2px;
  font-style: italic;
  text-align: center;
  margin-top: 90px;
  margin-bottom: 40px;
`;

export const LoginTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${colors.tertiary};
  text-align: center;
  margin-top: 10px;
  margin-bottom: 14px;
`;

export const LoginInputContainer= styled.View`
  margin-top: 23px;
  margin-bottom: 11px;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoginInput = styled.TextInput`
  height: 50px;
  background-color: ${colors.tertiary};
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  color: ${colors.secondary};
  letter-spacing: 1px;
  margin-horizontal: 25px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: ${colors.secondary};
  padding: 5px 20px;
  margin-top: 5px;
  border-radius: 12px;
  margin-horizontal: 25px;
  height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginButtonText = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 18px;
`;

export const LoginFooterText = styled.Text`
  text-align: center;
  color: #eeeeee;
  font-size: 15px;
  margin-top: 28px;
`;

export const LoginFooterLink = styled.Text`
  color: #ffffff;
  text-align: center;
  font-weight: bold;
  font-size: 15px;
`;

export const InfoText = styled.Text`
  color: #fca9a9;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin-top: 0px;
  margin-bottom: 7px;
`;

