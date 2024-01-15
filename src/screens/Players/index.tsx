import { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { Alert, FlatList, TextInput } from 'react-native';

import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Button } from '@components/Button';
import { ListEmpty } from '@components/ListEmpty';
import { Highlight } from "@components/Highlight";
import { PlayerCard } from '@components/PlayerCard';
import { ButtonIcon } from "@components/ButtonIcon";

import { AppError } from '@utils/AppError';

import { playersGetByGroup } from '@storage/player/playerGetByGroup';
import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';

type RouteParams = {
    group: string;
}

export function Players(){

    const [ newPlayerName, setNewPlayerName ] = useState('');

    const [team, setTeam] = useState('Time A');

    const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

    const route = useRoute();

    const { group } = route.params as RouteParams;

    const newPlayerNameInputRef = useRef<TextInput>(null);

    async function handleAddPlayer() {
        if(newPlayerName.trim().length === 0){
            return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar');
        }

        const newPlayer = {
            name: newPlayerName,
            team,
        }
        
        try {
            await playerAddByGroup(newPlayer, group);

            newPlayerNameInputRef.current?.blur();
            
            setNewPlayerName('');
            fecthPlayerByTeam();

        } catch (error) {
            if (error instanceof AppError){
                Alert.alert('Nova pessoa', error.message);
            } else {
                console.log(error);
                Alert.alert('Nova pessoa', 'Não foi possível adicionar');
            }
        }
    }

    async function fecthPlayerByTeam() {
        try {
            const playersByTeam = await playersGetByGroupAndTeam(group, team);
            setPlayers(playersByTeam);
        } catch (error) {
            console.log(error);
            Alert.alert('Pessoas', 'Não foi possivel carregar as pessoas do time selecionado')
        }
    }

    useEffect(() => {
        console.log("useEffect executou")
        fecthPlayerByTeam();
    }, [team]);

    return(
        <Container>
            <Header showBackButton />

            <Highlight 
                title={group}
                subtitle="Adicione os participantes"
            />

            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder="Digite o nome do participante"
                    onSubmitEditing={handleAddPlayer}
                    autoCorrect={false}
                    returnKeyType="done"          
                />
                <ButtonIcon 
                    icon="add"
                    onPress={handleAddPlayer}
                />
             </Form>
             <HeaderList>
                <FlatList 
                    data={['Time 1', 'Time 2']}
                    keyExtractor={item => item}
                    renderItem={({ item }) => (
                        <Filter
                            title={ item }
                            isActive={ item === team }
                            onPress={() => setTeam(item)}
                        />
                    )}
                    horizontal = {true}
                />
                <NumberOfPlayers> 
                    {players.length}
                </NumberOfPlayers>
            </HeaderList>
            
            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item.name} 
                        onRemove={() => { }}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                        message="Não há participantes no time"
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    { paddingBottom: 100 }, players.length === 0 && { flex: 1 }
                ]}
            />

            <Button 
                title="Remover turma"
                type="SECONDARY"   
            />

        </Container>
    );
}