import React from "react";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/components/common/AppNavigator";
import {Platform, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {useGlobalStyles} from "@/components/styles/useThemedStyles";
import {SimpleText} from "@/components/screens/about/SimpleText";
import {CitationText} from "@/components/screens/about/CitationText";
import {TitleText} from "@/components/screens/about/TitleText";
import {LinksList} from "@/components/common/LinksList";
import {RU_LANGUAGE} from "@/components/constatnts";

type Props = NativeStackScreenProps<RootStackParamList, 'AboutSermonsScreen'>;

const contentListRu = [
    'Информация в этом приложении это записи публичных лекций и личных бесед с бханте́ Раква́не Ньянаси́хой. В течение 7 лет практически всякий раз, общаясь с бханте́ на тему Дхаммы, я с его разрешения включал диктофон. У нас была договорённость, что я не буду распространять эти аудиозаписи, так как это требует некой выверки информации, учёта контекста подготовки публики и ещё многих факторов. Устная речь всегда требует адаптации для её перевода в письменную форму. Я записал эти проповеди и с помощью бханте и благих друзей мы собрали их в книгу «Bhāvanā — искусство ума». Теперь они доступны ещё и в этом приложении.',
    'Таким образом мы постарались сделать лекции бханте́ доступными для широкой аудитории. В результате такой переработки какие-то ошибки неизбежно закрадываются в текст и остаются на совести редакторов, поэтому просим читателя отнестись с пониманием и написать нам, если вы встретите опечатки или неточности.',
    'Часть этих лекций уже есть в публичном доступе в виде видеозаписей в сети Интернет, в то время как другие представляют собой записи личных бесед, а также проповедей с затворов, которые бханте́ каждый год проводит для русскоязычной публики. Мы старались компоновать информацию для этой книги так, чтобы получилось объёмное и структурированное изложение буддийской практики.',
    'Знакомясь с Учением Будды очень часто мы сталкиваемся с тем, что для многих палийских терминов просто нет соответствующих концепций в европейской ментальности, и переводчики вынуждены выбирать какое-то одно максимально подходящее слово. Оригинальные понятия из Учения могут быть отражены более упрощёнными понятиями современных языков, что в свою очередь может приводить к размытию смыслов. Само по себе это упрощение неизбежно при переводе с такого древнего языка как па́ли. Это лишь значит, что нам нужно стараться всесторонне подходить к изучению Слова Будды и приложить усилия, чтобы сформировать своё понимание ключевых концепций Учения. Важно понимать, что столь распространенное сейчас слово «медитация» пришло не из языка па́ли, на котором записано Слово Будды. Оно идёт от латинского слова «meditatio», что переводится как «размышление», «обдумывание», и было взято из христианства как наиболее похожий по смыслу термин к палийскому слову «bhāvanā». Бханте́ же чаще всего переводит его как развитие ума, культуру ума или искусство ума.',
    'Ещё в качестве примера можно привести палийское слово «sati», которое изначально на русский и английский языки переводили как «осознанность» и «mindfulness» соответственно. Если посмотреть на использование этого термина в современной речи — практически всегда его можно заменить на слово «внимательность» без какой-либо потери смысла. Но в Учении Будды для внимательности есть отдельное слово — «manasikāra». Само понятие «sati» включает в себя и памятование, и осознанность, и бдительность, и саморефлексию — это отдельный концепт, который мы должны сами для себя сформировать и усвоить, опираясь на Слово Будды. Внимательность может быть направлена на неблагое, осознанность (как она объясняется в Учении Будды) — никогда. Поэтому с точки зрения Дхаммы невозможно, например, осознанно грабить банк, или осознанно убивать.',
    'Бханте́ в своих лекциях старается раз за разом донести смысл оригинальных понятий, чтобы мы смогли ощутить вкус изначальной Дхаммы Будды во всей её полноте.',
    'Очень важно понимать, что буддийская практика — это не только сидение с закрытыми глазами и наблюдение какого-то объекта, и тем более это не стремление к состоянию безмыслия и бесчувственности. Развитие ума — это то, чем мы занимаемся всю свою жизнь: и выполняя свою работу, и проводя время с семьёй и друзьями, и воспитывая детей, и просто отдыхая наедине с собой. В конечном счёте мы учимся думать правильно, мы учимся видеть себя и свой ум. Не даром раздел мудрости в Благородном Восьмеричном Пути состоит из sammā-diṭṭhi (правильных воззрений) и sammā-sankappa (правильного мышления).',
    'Мы старались организовать структуру этой книги так, чтобы читатель смог получить представление о всех уровнях буддийской практики и сформировать своё понимание некоторых ключевых понятий Учения.',
    'Также для понимания Учения важно знать, что Будда говорил как с точки зрения sammuti sacca (относительной, или конвенциональной истины), так и с точки зрения paramattha sacca (абсолютной истины). На уровне относительной истины в частности мы используем слова «я», «человек» и им подобные, понимая, однако, что на уровне абсолютной истины никакого постоянного и неизменного «я» и «человека» нет — это всё наши концепции, конструкты нашего ума. Но без уровня относительной истины мы просто не смогли бы общаться и обмениваться информацией, поэтому Учение оперирует на обоих этих уровнях.',
    'К випассане как нельзя более точно относится утверждение, что ничему нельзя научить, можно только научиться, и на мой взгляд бханте́ обладает даром очень понятно и доступно объяснять даже самые сложные вещи в Учении Будды. Практика випассаны в свою очередь направлена на то, чтобы видеть мир как он есть, на уровне абсолютной истины.',
    'Уровень относительной истины никуда от нас не денется: мы так же будем способны думать, общаться, чувствовать, взаимодействовать друг с другом и различными предметами в мире. Но причины наших страданий мы можем увидеть только развивая свой ум, развивая видение реальности как она есть, и именно для этого нам нужна випассана. Иначе мы так и будем всю жизнь видеть причины своих страданий во внешнем мире и искать избавление от миража сансары внутри этого же миража, никогда не выходя за его пределы.',
    'Дхамма идёт против течения мира, поэтому я думаю, что в изучении випассаны важно постараться на время отложить привычную объектно-ориентированную картину мира, и попытаться заново сформировать новое понимание, идя изнутри наружу: понять, как возникает и исчезает мир именно для меня, именно для моего потока сознания. Нужно постараться отвязаться на время от привычного понятия чашки, стоящей на столе во внешнем мире, и попробовать понять, что я на самом деле вижу, слышу, ощущаю. Как это происходит. Как именно для меня возникает чашка, в моём уме, в моём потоке сознания. Тщательно проанализировать и рассмотреть свой личный опыт, происходящий с нами каждый миг, используя «карту», которую дал нам Будда. Невозможно получить это понимание от кого-то, его можно развить только самому, опираясь на помощь благих друзей и Слово Будды. И это то, чем мы занимаемся всю свою жизнь, стараясь идти по Благородному Восьмеричному Пути. Более того, Благородный Восьмеричный Путь выходит далеко за рамки одной текущей жизни, поэтому мы желаем вам, чтобы эта книга смогла помочь вам зародить и развить в себе саддху, то есть веру, доверие к Учению, и стремление на своём опыте понять и пережить то, о чём говорят нам благие друзья и Слово Будды.',
    'Это приложение является даром Дхаммы и предназначено для бесплатного распространения на благо всех живых существ. При копировании материала, пожалуйста, ставьте ссылку на сайты theravada.ru и samatha-vipassana.com.',
    'Пусть наши усилия в распространении учения Будды послужат благом для всех существ и принесут им наивысшее благо. Мы посвящаем заслуги от этого труда нашим умершим друзьям и родственникам: пусть все, кто могут извлечь пользу из этих заслуг, обретут мир, счастье и освобождение от всех страданий! Пусть заслуги от изучения этой Дхаммы помогут вам не сойти с Пути и освободиться от всех страданий!',
];

const contentListEn = [
    'This application contains recordings of public lectures and personal conversations with Bhante Rakwane Gnanaseeha. For the past seven years, nearly every time we discussed the Dhamma, I would, with his permission, turn on a voice recorder. We had an agreement that I would not distribute these audio recordings, as they required some verification of information, consideration of the context of the audience’s preparation, and many other factors. Oral speech always requires adaptation for its translation into written form. I recorded these teachings, and with the help of Bhante and good friends, we compiled them into the book ‘Bhāvanā — the Art of Mind.’ Now they are also available in this application. Thus, we have tried to make Bhante’s lectures accessible to a wider audience. As a result of this adaptation, some errors inevitably creep into the text and remain the responsibility of the editors, so we kindly ask the reader to approach this with understanding and to write to us if you encounter any typos or inaccuracies.',
    'Spoken words always need adaptation to be translated into written form. In this book, we have made every effort to take the necessary steps to make Bhante’s lectures accessible to a wide audience. As a result of this adaptation, some errors inevitably creep into the text and remain the responsibility of the editors. Therefore, we ask the reader to understand and to write to us if you encounter any typos or inaccuracies (contact information can be found at the end of the book).',
    'Some of these lectures are already publicly available as video recordings on the internet, while others are recordings of personal conversations and lectures from retreats that Bhante conducts annually for Russian-speaking audiences. We have strived to compile the information for this book in a way that provides a comprehensive and structured presentation of Buddhist practice.',
    'Very often, when we become acquainted with the Buddha’s Teachings, we encounter the fact that for many Pali terms, there are simply no corresponding concepts in European mentalities, and translators are forced to choose one and the most suitable word. The original concepts from the Teachings may be reflected by more simplified concepts in modern languages, which in turn can lead to a dilution of meanings. This simplification is inevitable when translating from such an ancient language as Pali. This simply means that we need to strive to approach the study of the Buddha’s words comprehensively and use our own efforts to form an understanding of the key concepts of the Teachings.',
    'It is important to understand that the now widespread word “meditation” did not come from the Pali language, in which the Buddha’s Words were recorded. It comes from the Latin word “meditatio,” which translates as “reflection” or “contemplation,” and was taken from Christianity as the closest term in meaning to the Pali word “bhāvanā.” Bhante most often translates it as the development of the mind, culture of the mind, or the art of the mind.',
    'Another example is the Pali word “sati,” which was originally translated into English as “mindfulness.” If we look at the use of this term in modern speech, it can almost always be replaced with the word “attentiveness” without any loss of meaning. However, in the Buddha’s Teachings, there is a separate word for attentiveness — “manasikāra.” The concept of “sati” itself includes recollection, mindfulness, vigilance, and self-reflection — it is a distinct concept that we must form and understand for ourselves, based on the Buddha’s words.',
    'Attentiveness can be directed towards the unwholesome, whereas mindfulness (as explained in the Buddha’s Teachings) never can. Therefore, from the perspective of the Dhamma, it is impossible, for example, to mindfully (with a sati) rob a bank or mindfully kill. It would be an ayoniso manasikāra — unwise attentiveness, but not sati.',
    'In his lectures, Bhante strives time and again to convey the meaning of the original concepts so that we can experience the taste of the Buddha’s original Dhamma in all its fullness. It is very important to understand that Buddhist practice is not just sitting with closed eyes and observing some object, and it is certainly not striving for a state of thoughtlessness and insensitivity. The development of the mind is something we engage in throughout our lives: while doing our work, spending time with family and friends, raising children, and simply relaxing alone. Ultimately, we learn to think correctly, we learn to see ourselves and our mind.',
    'It is no coincidence that the wisdom section of the Noble Eightfold Path consists of sammā-diṭṭhi (Right View) and sammā-sankappa (Right Thought). We have tried to structure this book so that the reader can gain a comprehension of all levels of Buddhist practice and form their own understanding of some key concepts of the Teachings.',
    'To understand the Teachings, it is also important to know that the Buddha spoke from the perspective of sammuti sacca (relative or conventional truth) as well as paramattha sacca (absolute truth). On the level of relative truth, we use words like “I,” “person,” and similar terms, understanding, however, that on the level of absolute truth there is no permanent and unchanging “I” or “self” — these are all our concepts, constructs of our mind. But without the level of relative truth, we simply could not communicate and exchange information; therefore, the Teachings operate on both of these levels.',
    'The statement that nothing can be taught, only learned, applies perfectly to vipassanā, and in my opinion, Bhante has the gift of explaining even the most complex aspects of the Buddha’s Teachings very clearly and accessibly. The practice of vipassanā, in turn, is aimed precisely at seeing the world as it is: we strive to see on the level of absolute truth.',
    'The level of relative truth will not disappear: we will still be able to think, communicate, feel, and interact with each other and various objects in the world. But the causes of our suffering can only be seen by developing our mind, by developing the vision of reality as it is and this is precisely why we need vipassanā. Otherwise, we will spend our entire lives seeing the causes of our suffering in the external world and seeking relief from the mirage of saṃsāra within this same mirage, never stepping beyond its boundaries.',
    'The Dhamma is subtle, deep, difficult to see, and goes against the worldly stream, so I believe that in studying vipassanā, it is important to try to set aside the usual object-oriented view of the world for a while and attempt to form a new understanding from the inside out: to understand how the world arises and disappears specifically for me, for my own stream of consciousness. We need to try to detach temporarily from the familiar concept of a cup standing on a table in the external world and try to understand what I actually see, hear and feel, and how this happens. How the cup arises specifically for me, in my mind, in my stream of consciousness. Carefully analyze and examine our own personal experience that occurs with us every moment, using the “map” given to us by the Buddha. This understanding cannot be obtained from someone else; it can only be developed by oneself, relying on the help of good friends and the Buddha’s words. This is what we engage in throughout our lives striving to follow the Noble Eightfold Path.',
    'Moreover, the Noble Eightfold Path goes far beyond one current life, so we wish for this book to help you develop and cultivate saddhā — that is, rightful faith, trust in the Teachings and the aspiration to understand and experience for yourself what good friends and the Buddha’s words tell us.',
    'This application is a gift of the Dhamma and is intended for free distribution for the benefit of all living beings. When copying any material, please include links to the websites theravada.ru and samatha-vipassana.com.',
    'May our efforts in spreading the Teachings of the Buddha serve the well-being of all beings and bring them the highest benefit. We dedicate the merits of this work to our deceased friends and relatives: may all those who can benefit from these merits attain peace, happiness, and liberation from all suffering!',
    'May the merits from studying this Dhamma help you stay on the Path and be free from all suffering!',
];

const gathaContentRu = [
    'Дар Дхаммы превыше всех даров,',
    'Вкус Дхаммы превыше всех вкусов,',
    'Наслаждение Дхаммой превосходит все наслаждения,',
    'Уничтожение жажды побеждает все страдания.',
];

const gathaContentEn = [
    'The gift of the Dhamma surpasses all gifts,',
    'The taste of the Dhamma surpasses all tastes,',
    'The delight in the Dhamma surpasses all delights,',
    'The destruction of craving conquers all suffering.',
];

const Content = ({isRuLang}: {isRuLang: boolean}) => {
    const mainContent = isRuLang ? contentListRu : contentListEn;
    const gathaContent = isRuLang ? gathaContentRu : gathaContentEn;
    return (
        <>
            {(mainContent).map((item, index) =>
                (<SimpleText key={index}>{item}</SimpleText>))}
            {(gathaContent).map((item, index) =>
                (<CitationText key={index}>{item}</CitationText>))}

            <CitationText isAlignedRight={true}>{isRuLang ? 'Дхаммапада 354' : 'Dhammapada 354, editor’s translation'}</CitationText>
        </>
    );
}

export const AboutSermonsScreen = ({ route }: Props) => {
    const {language} = route.params;
    const {t} = useTranslation();
    const globalStyles = useGlobalStyles();


    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            {Platform.OS === 'android' && (
                <TitleText>
                    {t('AboutSermonsScreen')}
                </TitleText>
            )}
            <Content isRuLang={language === RU_LANGUAGE}/>
            <SimpleText>{t('blessings')}</SimpleText>
            <SimpleText isAlignedRight={true}>{t('MyNameIs')}</SimpleText>
            <LinksList data={[{url: 'https://samatha-vipassana.com/books/', text: t('DownloadBook')}]}/>
        </ScrollView>
    );
}