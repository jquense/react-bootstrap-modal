import React from 'react'
import ReactDOM from 'react-dom'
import Modal from '../../src/Modal'
import {
  LiveEditor,
  LiveError,
  LiveProvider,
  LivePreview
} from 'react-live'

let scope = { Modal, React, ReactDOM }

export default function EditableExample(props) {
  return (
    <LiveProvider
      noInline
      {...props}
      scope={scope}
    >
      <LivePreview />
      <LiveError />
      <LiveEditor />
    </LiveProvider>
  );
}
