import React from 'react';
import { findDOMNode } from 'react-dom';
var Modal = require('../src/Modal');
var dom = require('dom-helpers')
var simulant = require('simulant')

var qsa = document.querySelectorAll.bind(document)

var $ = require('teaspoon');

describe('Modal', () => {
  let inst;

  afterEach(()=> {
    //clear out old values
    inst && inst.unmount && inst.unmount()
    document.body.innerHTML = ''
  })

  it('should render into the DOM', () => {
    inst = $(<Modal id='test'/>).render();

    dom.contains(document.body, document.getElementById('test'))
      .should.equal(false)

    $(<Modal id='test' show/>).render();

    dom.contains(document.body, document.getElementById('test'))
      .should.equal(true)
  })


  it('should render backdrop', () => {
    inst = $(<Modal id='test' show/>).render();

    qsa('.modal-backdrop').length.should.equal(1)
  })

  it('should leave out backdrop', () => {
    inst = $(<Modal id='test' backdrop={false}/>).render();

    qsa('.modal-backdrop').length.should.equal(0)
  })

  it('should trigger close on backdrop click', done => {
    inst = $(<Modal id='test' show onHide={()=> done()}/>).render();

    $(inst[0].backdrop).trigger('click')
  })

  it('should not trigger close on static backdrop click', () => {
    let err = ()=> { throw new Error('should not trigger onHide')}

    inst = $(<Modal backdrop='static' show onHide={err}/>).render();

    $(inst[0].backdrop).trigger('click')
  })

  it('should trigger close on backdrop click', done => {
    inst = $(<Modal show onHide={()=> done() }/>).render();

    $(inst[0].backdrop).trigger('click')
  })

  it('should trigger close on ESC', done => {
    inst = $(<Modal show onHide={()=> done() }/>).render();

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  it('should not trigger close on ESC when keyboard is false', () => {
    let err = ()=> { throw new Error('should not trigger onHide')}

    inst = $(<Modal show keyboard={false} onHide={err}/>).render();

    simulant.fire(qsa('.modal')[0], 'keyup', { keyCode: 27 })
  })

  describe('Header', ()=> {

    it('should include a close button', () => {
      inst = $(<Modal.Header closeButton>{'title'}</Modal.Header>).render()

      inst.find('.close:dom').single()
    })

    it('should trigger onHide in parent', done => {
      inst = $(
        <Modal show backdrop='static' onHide={()=> done() }>
          <Modal.Header closeButton />
        </Modal>
      ).render()

      $(inst[0].dialog).find('.close').trigger('click')
    })
  })

  describe('Dismiss', ()=> {

    it('should trigger onHide in parent', done => {
      inst = $(
        <Modal show backdrop='static' onHide={()=> done() }>
          <div><Modal.Dismiss className='close-btn'/></div>
        </Modal>
      ).render()

      $(inst[0].dialog).find('.close-btn').trigger('click')
    })

    it('should use the `component` prop', () => {
      let Button = ()=> <a>{'hi'}</a>

      inst = $(<Modal.Dismiss component='span'/>).shallowRender();

      inst.children()[0].type.should.equal('span')

      inst = $(<Modal.Dismiss component={Button}/>).shallowRender();

      inst.children()[0].type.should.equal(Button)
    })
  })
})
