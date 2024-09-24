import {Component} from "react"

import "./index.css"

class UserFolder extends Component {
    state={inputValue:"",charactersCount:0,replaceWord:"",searchWord:""}

    onClickReplace = () => {
        const {inputValue,searchWord,replaceWord}=this.state
        const originalContent = inputValue.split(" ")
        let replacedContent = ""
        for (let i of originalContent) {
            if (i===searchWord) {
                replacedContent += replaceWord + " ";
            }
            else {
                replacedContent += i + " ";
            }
        }
        this.setState({inputValue:replacedContent})
    }

    onChangeUserInput = (event) => {
        this.setState({inputValue:event.target.value},this.onCharacterCount)
    }

    onCharacterCount = () => {
        const {inputValue} =this.state
        const filteredText = inputValue.replace(/[^a-zA-Z0-9]/g, '');
        const CountOfCharacters = filteredText.length
        this.setState({charactersCount:CountOfCharacters})
    }


    onUniqueEvent = () => {
        const {inputValue} = this.state
        if (inputValue !== "") {
            const originalText = inputValue.toLowerCase();
            const words = originalText.match(/\b\w+\b/g);
            const uniqueText = new Set(words)
            console.log(uniqueText)
            const lengthOfUnique = uniqueText.size
            console.log(lengthOfUnique)
            return lengthOfUnique
        }
    }

    onChangeReplaceWord = (event) => {
        this.setState({replaceWord:event.target.value})
    }

    onChangeSearchWord = event => {
        this.setState({searchWord:event.target.value})
    }

    onClickReset = () => {
        this.setState({inputValue:"",replaceWord:"",searchWord:"",charactersCount:0})
    }

    render() {
        const {inputValue,charactersCount,replaceWord,searchWord}=this.state
        const uniqueCount = inputValue===""?0: this.onUniqueEvent()
        
        return(<div>
            <textarea rows={10} cols={50} className="textarea" value={inputValue} onChange={this.onChangeUserInput}></textarea>
            <div className="inputElements">
                <div className="elements">
                    <label htmlFor="search" className="labeltext">Search</label>
                    <input type="text" id="search" value={searchWord} onChange={this.onChangeSearchWord}/>
                </div>
                <div className="elements">
                    <label htmlFor="replace" className="labeltext">Replace</label>
                    <input type="text" id="replace" value={replaceWord} onChange={this.onChangeReplaceWord}/>
                </div>
            </div>
            <p className="content">Unique Words Count: {uniqueCount}</p>
            <p className="content">Characters Count: {charactersCount}</p>
            <div>
                <button type="button" className="button" onClick={this.onClickReplace}>Replace All</button>
                <button type="button" className="button" onClick={this.onClickReset}>Reset</button>
            </div>
        </div>)
    }

}

export default UserFolder