import React, { Component } from 'react';
import { View, StyleSheet, Keyboard
, TouchableWithoutFeedback
, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import  CNRichTextEditor , { CNToolbar, getInitialObject  } from "react-native-cn-richtext-editor";

const IS_IOS = Platform.OS === 'ios';

class App extends Component {
 
    constructor(props) {
        super(props);

        this.state = {
            selectedTag : 'body',
            selectedStyles : [],
            value: [getInitialObject]
        };

        this.state.value = [getInitialObject()];

        this.editor = null;
      
    }

    onStyleKeyPress = (toolType) => {


        if (toolType == 'image') {
            return;
        }
        else {
            this.editor.applyToolbar(toolType);
        }

    }

    
  onSelectedTagChanged = (tag) => {

    this.setState({
        selectedTag: tag
    })
  }

  onSelectedStyleChanged = (styles) => {
   
    this.setState({
        selectedStyles: styles
    })
}

onValueChanged = (value) => {
    this.setState({
        value: value
    });
}

insertImage(url) {
    
    this.editor.insertImage(url);
}

  
render() {
    return (
        <KeyboardAvoidingView
        behavior="padding" 
        enabled
        keyboardVerticalOffset={IS_IOS ? 0 : 0}
        style={{
            flex: 1,
            paddingTop: IS_IOS ? 20 : 0,
            backgroundColor:'#eee',
            flexDirection: 'column', 
            justifyContent: 'flex-end',
        }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >             
                <View style={styles.main}>
                    <CNRichTextEditor                   
                        ref={input => this.editor = input}
                        onSelectedTagChanged={this.onSelectedTagChanged}
                        onSelectedStyleChanged={this.onSelectedStyleChanged}
                        value={this.state.value}
                        style={{ backgroundColor : '#fff', padding : 10}}
                        //foreColor=''
                        onValueChanged={this.onValueChanged}
                        //onRemoveImage={this.onRemoveImage}
                    />                        
                </View>
        </TouchableWithoutFeedback>

        <View style={{
            minHeight: 35
        }}>

            <CNToolbar
                size={28}
                bold={<MaterialCommunityIcons name="format-bold" />}
                italic={<MaterialCommunityIcons name="format-italic" />}
                underline={<MaterialCommunityIcons name="format-underline" />}
                lineThrough={<MaterialCommunityIcons name="format-strikethrough-variant" />}
                body={<MaterialCommunityIcons name="format-text" />}
                title={<MaterialCommunityIcons name="format-header-1" />}
                heading={<MaterialCommunityIcons name="format-header-3" />}
                ul={<MaterialCommunityIcons name="format-list-bulleted" />}
                ol={<MaterialCommunityIcons name="format-list-numbers" />}
                image={<MaterialCommunityIcons name="image" />}
                selectedTag={this.state.selectedTag}
                selectedStyles={this.state.selectedStyles}
                onStyleKeyPress={this.onStyleKeyPress} />
        </View>
    </KeyboardAvoidingView>
    );
}
}

var styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 1,
        alignItems: 'stretch',
    },
});

export default App;