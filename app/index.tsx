import { useCallback, useState } from "react";
import { ActivityIndicator, Button, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  promptButton : {
    margin:12
  },

   item: {
    backgroundColor: '#f9c2ff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
    padding : 20,
  },
  title: {
    fontSize: 24,
  },
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
const fetchPrompt = (prompt : string ) => {

}

type QuizChoice = {
  choiceId : number;
  choiceLabel : string
}
type QuizQuestion = {
  questionId : number
  title : string
  data : QuizChoice[]
}
const initialQuestions : QuizQuestion[] = [
  {
    questionId: 1,
    title: 'What is the national flower of Bangladesh?',
    data : [
      {
        choiceId : 1,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 2,
        choiceLabel: 'Rose'
      },
      {
        choiceId : 3,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 4,
        choiceLabel: 'Rose'
      }
    ]
  },
   {
    questionId: 2,
    title: 'What is the national phool of Bangladesh?',
    data : [
      {
        choiceId : 5,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 6,
        choiceLabel: 'Rose'
      },
      {
        choiceId : 3,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 4,
        choiceLabel: 'Rose'
      }
    ]
  },
  {
    questionId: 3,
    title: 'What is the national phool of Bangladesh?',
    data : [
      {
        choiceId : 5,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 6,
        choiceLabel: 'Rose'
      },
      {
        choiceId : 3,
        choiceLabel : 'Lily'
      },
      {
        choiceId: 4,
        choiceLabel: 'Rose'
      }
    ]
  }
]
const Questions = ({questions} : {questions : QuizQuestion[]}) => {
  return <View>
  <SectionList
        sections={questions}
        keyExtractor={(item, index) => item.choiceId.toString() + index.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.choiceLabel}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
  </View>
}
const Prompt = ({onPromptSubmit, text, onChangeText, disabed} : {disabed : boolean,onPromptSubmit : (prompt : string) => void, text:string,  onChangeText : (txt : string) => void}) => {
  return <>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          readOnly={disabed}
        />
      <Button title="Generate Quiz"
      
       onPress={(e) => onPromptSubmit(text)} disabled={disabed} />
  </>
}
export default function Index() {
  const [text, onChangeText] = useState('Useless Text');
  const [quizes, setQuizes] = useState<QuizQuestion[]>(initialQuestions)
  const [state, setState] = useState<'pending' | 'fetched' | 'initial'>('initial')
  const [error, setError] = useState<string | null>(null);
  const submitPrompt  = useCallback(() => {
    setState('pending');

    function fn(){
      setState('fetched')
      onChangeText('');
    }
    setTimeout(fn, 1000)
  }, []);
  return (
     <SafeAreaProvider>
          
      <SafeAreaView>
        <Prompt onChangeText={onChangeText} 
        onPromptSubmit={submitPrompt}
        text={text}
        disabed={state === 'pending' || error != null}
        />
        {state === 'pending' && <ActivityIndicator size="large" />}
        {error && <View>
          <Text>Sorry, an Error has happened: {error}</Text>
          </View>
        }
        {state === 'fetched' && <Questions questions={quizes} />}
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
