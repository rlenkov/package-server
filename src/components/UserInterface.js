import React, { useState } from 'react'
import styles from './userinterface.module.scss'
import { getFileFromUrl, listFiles, testQuery } from '../calls'

const UserInterface = props => {
    const [output, setOutput] = useState('')

    const getOutput = text => {
        setOutput(text)
    }

    const handleSubmitUrl = e => {
        e.preventDefault()
        if (!e.target.elements.url.value) {
            alert('URL missing!')
            return
        }
        getFileFromUrl(e.target.elements.url.value, getOutput)
    }

    return (
        <div className={styles.container}>
            <h1>TEST INTERFACE!</h1>
            <div className={styles.managerContainer}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputBox}>
                        <button
                            onClick={() => {
                                listFiles(getOutput)
                            }}
                            type='button'
                        >
                            List Resource Dir
                        </button>
                    </div>
                    <div className={styles.inputBox}>
                        <form
                            onSubmit={e => {
                                handleSubmitUrl(e)
                            }}
                        >
                            <label>
                                Download from URL:
                                <input
                                    type='text'
                                    id='file-url'
                                    name='url'
                                    placeholder='url'
                                    required
                                />
                            </label>
                            <button type='submit'>Get File</button>
                        </form>
                    </div>
                    <div className={styles.inputBox}>
                        <button
                            onClick={() => {
                                testQuery(getOutput)
                            }}
                            type='button'
                        >
                            Run Test Packaging
                        </button>
                    </div>
                </div>
                <div className={styles.outputContainer}>
                    {output === '' ? <p>|</p> : output}
                </div>
            </div>
        </div>
    )
}

export default UserInterface
