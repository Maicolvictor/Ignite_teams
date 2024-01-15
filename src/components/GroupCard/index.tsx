import { TouchableOpacityProps } from 'react-native';
import { Container, Icon, Title } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;
}
// o container na funçao a seguir recebeu a estilização de um touchable opacity
// porém ele só vai receber a tipagem de um botão se ele estiver tipado com a TouchableOpacityProps
// tendo tipado isso ele vai poder receber as funções normais, exemplo: onPress e etc...
export function GroupCard({ title, ...rest}: Props ){
    return(
        <Container {...rest}>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
    );
}