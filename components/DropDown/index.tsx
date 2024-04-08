import { FC, memo, useRef } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { DropDownContainer, DropDownItem, DropDownItemSelected, DropDownItemText, DropDownList, DropDownText } from './styles';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAnimatedList } from '../../hooks/useAnimatedList';
import { FeatherIcons } from '../../types/Icons';

interface DropList {
  title: string;
  item: string;
}

interface Props {
  currentItem: string;
  isIncludes: boolean;
  dropDownId: string;
  setDropDownId: React.Dispatch<React.SetStateAction<string>>;
  onPress: (item: string) => void;
  dropDownList: DropList[];
}

export const DropDown: FC<Props> = memo(({
  currentItem,
  dropDownId,
  isIncludes,
  dropDownList,
  setDropDownId,
  onPress,
}) => {
  const { theme: { colors } } = useTheme();
  const { i18n } = useTranslation();
  const dropRef = useRef(null);
  const handlePress = (item: string) => {
    onPress(item);
    setDropDownId('');
  };
  const animatedStyle = useAnimatedList(isIncludes);

  return (
    <>
      <DropDownContainer style={animatedStyle} ref={dropRef}>
        <DropDownList bgColor={colors.card} borderColor={colors.borderColor}>
          <FlatList
            data={dropDownList}
            keyExtractor={(item) => item.title}
            renderItem={({ item: { title, item }, index }: { item: DropList, index: number }) => {
              const isSelected = item === currentItem;
              const isHasBorder = dropDownList.length !== index + 1;

              return (
                <DropDownItem 
                  onPress={() => handlePress(item)} 
                  disabled={isSelected}
                  style={isHasBorder && {
                    borderBottomWidth: 1,
                    borderStyle: 'solid',
                    borderBottomColor: colors.borderColor,
                  }}
                >
                  <DropDownItemSelected>
                    {isSelected && (
                      <Feather name={FeatherIcons.CHECK} size={16} color={colors.activeColor} />
                    )}
                  </DropDownItemSelected>
                  <DropDownItemText color={colors.primaryColor}>{title}</DropDownItemText>
                </DropDownItem>
              );
            }}
          />
        </DropDownList>
      </DropDownContainer>

      <TouchableOpacity style={{ minWidth: 40 }} onPress={() => setDropDownId(dropDownId)}>
        <DropDownText color={colors.activeColor}>
          {i18n.language.toUpperCase()}
        </DropDownText>
      </TouchableOpacity>
    </>
  );
});