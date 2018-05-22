import React, { Component } from 'react'
import Modal from 'react-modal'
import { Container } from 'semantic-ui-react'
import styles from './ModalCrearProducto.css'

Modal.setAppElement('#root')

class ModalCrearProducto extends Component {
  showModal () {
    return (
      <Container>
        <div className={styles.title}>
          <h1>Crear Producto</h1>
        </div>
        <form>
          <ul className={styles.wrapper1}>
            <li className={styles.formRow}>
              <label>Nombre: </label><br />
              <input
                type='text'
                name='name'
                placeholder='Televisor 50 4K'
                autoComplete='name'
                className={styles.input}
                onChange={this.props.onHandleInput}
              />
            </li>
            <ul className={styles.wrapper2}>
              <li className={styles.formRow}>
                <label>Precio: </label><br />
                <input
                  type='text'
                  name='price'
                  placeholder='19999.99'
                  className={this.props.onInputErrorPrice ? styles.inputError : styles.input}
                  onChange={this.props.onHandleInput}
                />
              </li>
              <li className={styles.formRow}>
                <label>Precio de lista: </label><br />
                <input
                  type='text'
                  name='listPrice'
                  placeholder='19999.99'
                  className={this.props.onInputErrorListPrice ? styles.inputError : styles.input}
                  onChange={this.props.onHandleInput}
                />
              </li>
            </ul>
            <ul className={styles.wrapper2}>
              <li className={styles.formRow}>
                <label>Marca: </label><br />
                <input
                  type='text'
                  name='brand'
                  placeholder='Sony'
                  className={styles.input}
                  onChange={this.props.onHandleInput}
                />
              </li>
              <li className={styles.formRow}>
                <label>Categoria Id: </label><br />
                <input
                  type='text'
                  name='categoryId'
                  placeholder='12345'
                  className={this.props.onInputErrorCategoryId ? styles.inputError : styles.input}
                  onChange={this.props.onHandleInput}
                />
              </li>
            </ul>
            <li className={styles.formRowButtons}>
              <button
                className={styles.buttonCancel}
                onClick={this.props.onCloseModal}>
                Cancelar
              </button>
              <button
                className={styles.buttonCreate}
                disabled={
                  this.props.onInputErrorPrice ||
                  this.props.onInputErrorListPrice ||
                  this.props.onInputErrorCategoryId ||
                  this.props.onState.name === '' ||
                  this.props.onState.price === '' ||
                  this.props.onState.list_price === '' ||
                  this.props.onState.brand === '' ||
                  this.props.onState.category_id === ''
                }
                onClick={this.props.onCreate}>
                Crear
              </button>
            </li>
          </ul>
        </form>
      </Container>
    )
  }

  render () {
    const { modalIsOpen } = this.props.onState
    return (
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={this.props.onCloseModal}
        className={styles.content}
        contentLabel='Example Modal'
      >
        {this.showModal()}
      </Modal>
    )
  }
}

export default ModalCrearProducto
