import { FlatList, View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFaqs } from '../util/dbFunctions'
import { faqInterface } from '../util/interfaces'
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { Button, Div, Text, Modal, Icon } from 'react-native-magnus';
import { CommonHeader } from '../components/headers/CommonHeader';
import { FadeInDown } from 'react-native-reanimated';

export default function FAQ({ navigation }: any)
{

  const [FAQ, setFAQ] = useState<faqInterface[]>();
  const [visible, setVisible] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<faqInterface>();

  useEffect(() =>
  {
    const loader = async () =>
    {
      try
      {
        const faqSnapshot = await getFaqs();
        const faqArray: faqInterface[] = [];
        faqSnapshot.forEach((faq) =>
        {
          const faqData = faq.data() as faqInterface;
          faqArray.push({ id: faq.id, ...faqData })
        });
        setFAQ(faqArray);
      } catch (error)
      {
        console.log('Error getting FAQ items', error);
      }
    }
    loader();
  }, [])

  const handleFaqClick = (event: any) =>
  {
    console.log('Called handleFaqClick', event);
    // const {title, description} = event;
    if (visible)
    {
      setVisible(false)
    }
    setSelectedFaq(event)
    setVisible(true);

  }

  return (
    <Div>
      <CommonHeader title='FAQ' navigation={navigation} headerRight={false} />
      <Div alignItems='center' justifyContent='center' my={15}>
        <FlatList
          data={FAQ}
          keyExtractor={(FAQ) => FAQ.id}
          renderItem={({ item }) => (
            <Button w='100%' bg='#45A053' my={5} onPress={() => handleFaqClick(item)}>
              <Text
                color='white'
                fontSize='xl'
                fontWeight="bold">
                {item.title}
              </Text></Button>
          )}
        />
      </Div>
      <Modal isVisible={visible}>
        <CommonHeader title='FAQ' navigation={navigation} headerRight={false} />
        <Div p={20} shadow={5} rounded={30} borderColor='#45A053' my={40} borderWidth={2} justifyContent='center'>
          <Text
            fontSize={30}
            fontWeight="bold"
            textAlign='center'
            textTransform='uppercase'
            mt="lg"
          >{selectedFaq?.title}</Text>
          <Text my={10} p={10} fontSize={14} letterSpacing={1}>{selectedFaq?.description}</Text>
        </Div>
        <Button
          w='70%'
          bg="#45A053"
          my={10}
          alignItems='center'
          alignSelf='center'
          onPress={() => setVisible(false)}
        > Close
        </Button>
      </Modal>
    </Div>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 400,
    borderWidth: 1
  },
});
