// Dependencies
import React, { Component } from 'react'
import moment from 'moment'

// Styles
import styles from './Product.css'

class Product extends Component {
  date () {
    const date = new Date()
    return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY')
  }

  showSaveConfirmation () {
    return (
      <div className={styles.msjRejected}>
        <span>¿Estás seguro de guardar los cambios?</span>
        <div>
          <button
            className={styles.cancelMsjButton}
            onClick={() => this.props.onCancelSaveConfirmationMsj(this.props.item._id)}>
          Cancelar
          </button>
          <button
            className={styles.rejectMsjButton}
            onClick={(event, id) => this.props.onAcceptSaveConfirmationMsj(event, this.props.item._id)}>
          Guardar
          </button>
        </div>
      </div>
    )
  }

  showDeleteConfirmation () {
    return (
      <div className={styles.msjRejected}>
        <span>¿Estás seguro de eliminar el producto {this.props.item.name} ?</span>
        <div>
          <button
            className={styles.cancelMsjButton}
            onClick={() => this.props.onCancelRemoveConfirmationMsj(this.props.item._id)}>
          Cancelar
          </button>
          <button
            className={styles.rejectMsjButton}
            onClick={() => this.props.onAcceptRemoveConfirmationMsj(this.props.item._id)}>
          Eliminar
          </button>
        </div>
      </div>
    )
  }

  showInformation () {
    return (
      <div>
        <div className={styles.name}>
          <input
            type='text'
            name='name'
            placeholder='Tv LED'
            defaultValue={this.props.item.name}
            disabled={!this.props.item.clickEditButton}
            onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
          />
        </div>
        <div className={styles.properties}>
          <ul className={styles.property}>
            <li><span>Price</span></li>
            <li className={styles.currency}>
              <span>$</span>
              <input
                type='text'
                name='price'
                placeholder='19999.99'
                defaultValue={this.props.item.price}
                disabled={!this.props.item.clickEditButton}
                className={this.props.item.inputErrorPrice ? styles.inputError : styles.input}
                onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
              />
            </li>
          </ul>
          <ul className={styles.property}>
            <li><span>List Price</span></li>
            <li className={styles.currency}>
              <span>$</span>
              <input
                type='text'
                name='listPrice'
                placeholder='19999.99'
                defaultValue={this.props.item.list_price}
                disabled={!this.props.item.clickEditButton}
                className={this.props.item.inputErrorListPrice ? styles.inputError : styles.input}
                onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
              />
            </li>
          </ul>
          <ul className={styles.property}>
            <li><span>Brand</span></li>
            <li>
              <input
                type='text'
                name='brand'
                placeholder='Sony'
                defaultValue={this.props.item.brand}
                disabled={!this.props.item.clickEditButton}
                className={styles.input}
                onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
              />
            </li>
          </ul>
          <ul className={styles.property}>
            <li><span>Category Id</span></li>
            <li>
              <input
                type='text'
                name='categoryId'
                placeholder='12345'
                defaultValue={this.props.item.category_id}
                disabled={!this.props.item.clickEditButton}
                className={this.props.item.inputErrorCategoryId ? styles.inputError : styles.input}
                onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
              />
            </li>
          </ul>
          <ul className={styles.property}>
            <li><span>Virtual</span></li>
            <li>
              <input
                type='checkbox'
                id={`virtual#${this.props.item._id}`}
                name='virtual'
                placeholder=''
                checked={this.props.item.clickEditButton === undefined
                  ? this.props.item.virtual || false
                  : this.props.item.clickEditButton
                    ? document.getElementById(`virtual#${this.props.item._id}`).checked
                    : this.props.item.clickCancelButton
                      ? this.props.item.virtual || false
                      : this.props.onState.virtual}
                disabled={!this.props.item.clickEditButton}
                onChange={(event, id) => this.props.onHandleInput(event, this.props.item._id)}
              />
            </li>
          </ul>
        </div>
      </div>
    )
  }

  showDeleteButton () {
    return (
      <div className={styles.rejectButton}>
        <button
          className={this.props.item.clickRejectButton ? styles.rejectActiveButton : styles.rejectInactiveButton}
          disabled={this.props.item.clickRejectButton}
          onClick={(event, id) => this.props.onRemove(event, this.props.item._id)}>
          <i className='fas fa-trash' />
        </button>
      </div>
    )
  }

  showEditSaveButton () {
    return (
      <div className={styles.editButton}>
        <button
          className={this.props.item.modeSaving === undefined
            ? styles.editButton
            : this.props.item.clickEditButton || this.props.item.clickSaveButton
              ? styles.rejectActiveButton : styles.editButton}
          disabled={this.props.item.inputErrorPrice || this.props.item.inputErrorListPrice || this.props.item.inputErrorCategoryId}
          onClick={this.props.item.clickEditButton
            ? (event, id) => this.props.onSave(event, this.props.item._id)
            : (event, id) => this.props.onEdit(event, this.props.item._id)}
        >
          <i className={this.props.item.modeSaving === undefined
            ? 'fas fa-pencil-alt'
            : this.props.item.clickEditButton || this.props.item.clickSaveButton
              ? 'fas fa-save' : 'fas fa-pencil-alt'} />
        </button>
      </div>
    )
  }

  render () {
    return (
      <div className={styles.itemProduct}>
        {this.showDeleteButton()}
        {this.props.item.clickRejectButton
          ? this.showDeleteConfirmation()
          : this.props.item.clickSaveButton && !(this.props.item.inputErrorPrice || this.props.item.inputErrorListPrice || this.props.item.inputErrorCategoryId)
            ? this.showSaveConfirmation()
            : this.showInformation()}
        {this.props.item.clickRejectButton ? null : this.showEditSaveButton()}
      </div>
    )
  }
}

export default Product
