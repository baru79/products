// Dependencies
import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { TransitionGroup } from 'react-transition-group'

// Components
import FadeTransition from './FadeTransition'
import ModalCrearProducto from './ModalCrearProducto'
import ListProducts from './ListProducts'
import Product from './Product'

// Styles
import styles from './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      productos: [],
      name: '',
      price: '',
      list_price: '',
      brand: '',
      category_id: '',
      virtual: false,
      inputErrorPrice: false,
      inputErrorListPrice: false,
      inputErrorCategoryId: false,
      modalIsOpen: false,
      modalInputErrorPrice: false,
      modalInputErrorListPrice: false,
      modalInputErrorCategoryId: false,
      clickRejectButton: false,
      clickSaveButton: false,
      clickEditButton: false,
      clickCancelButton: false,
      modeSaving: false,
      disabledAcceptButton: true
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleInputModal = this.handleInputModal.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
    this.edit = this.edit.bind(this)
    this.save = this.save.bind(this)
    this.remove = this.remove.bind(this)
    this.cancelSaveConfirmationMsj = this.cancelSaveConfirmationMsj.bind(this)
    this.acceptSaveConfirmationMsj = this.acceptSaveConfirmationMsj.bind(this)
    this.cancelRemoveConfirmationMsj = this.cancelRemoveConfirmationMsj.bind(this)
    this.acceptRemoveConfirmationMsj = this.acceptRemoveConfirmationMsj.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount () {
    fetch('http://localhost:3000/products')
      .then(products => {
        return products.json()
      })
      .then(data => {
        this.setState({
          productos: data.products
        })
      })
  }

  post () {
    const { name, price, list_price, brand, category_id } = this.state
    const objBody = {
      name,
      price,
      list_price,
      brand,
      category_id
    }
    fetch('http://localhost:3000/products/',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objBody)
      })
      .then(res =>
        res.json()
      )
      .then(res => {
        if (res.sucess) {
          this.setState({
            productos: this.state.productos.concat([res.product]),
            modalIsOpen: false
          })
        }
      })
  }

  put (id) {
    const { productos } = this.state
    const itemProduct = productos.find(item => item._id === id)
    const { name, price, list_price, brand, category_id, virtual } = this.state
    let objBody = {
      name: null,
      price: null,
      list_price: null,
      category_id: null,
      virtual: null
    }
    if (name !== '') {
      objBody.name = name
    } else {
      objBody.name = itemProduct.name
    }
    if (price !== '') {
      objBody.price = price
    } else {
      objBody.price = itemProduct.price
    }
    if (list_price !== '') {
      objBody.list_price = list_price
    } else {
      objBody.list_price = itemProduct.list_price
    }
    if (brand !== '') {
      objBody.brand = brand
    } else {
      objBody.brand = itemProduct.brand
    }
    if (category_id !== '') {
      objBody.category_id = category_id
    } else {
      objBody.category_id = itemProduct.category_id
    }
    objBody.virtual = virtual
    fetch(`http://localhost:3000/products/${id}`,
      {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(objBody)
      })
      .then(res =>
        res.json()
      )
      .then(res => {
        if (res.sucess) {
          const id = res.id
          const productUpdated = Object.assign(objBody, {_id: id})
          this.state.productos.map((item, index) => {
            if (item._id.toString() === id.toString()) {
              this.state.productos.splice(index, 1, productUpdated)
            }
          })
          this.setState({
            productos: this.state.productos
          })
        }
      })
  }

  delete (id) {
    fetch(`http://localhost:3000/products/${id}`,
      {
        method: 'delete',
        headers: {'Content-Type': 'application/json'}
      })
      .then(res =>
        res.json()
      )
      .then(res => {
        if (res.sucess) {
          const {productos} = this.state
          const obj = productos.filter(item => item._id !== id)
          this.setState({
            productos: obj
          })
        }
      })
  }

  handleCreate (event) {
    event.preventDefault()
    this.post()
  }

  handleInputModal (event) {
    const inputName = event.target.name
    const inputValue = event.target.value
    let patt
    let res
    switch (inputName) {
      case 'name':
        this.setState({
          name: inputValue
        })
        break
      case 'brand':
        this.setState({
          brand: inputValue
        })
        break
      case 'price':
        patt = /^[0-9]*[.]?[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            this.setState({
              price: inputValue,
              modalInputErrorPrice: false
            })
          } else {
            this.setState({
              price: inputValue,
              modalInputErrorPrice: true
            })
          }
        } else {
          this.setState({
            price: inputValue,
            modalInputErrorPrice: false
          })
        }
        break
      case 'listPrice':
        patt = /^[0-9]*[.]?[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            this.setState({
              list_price: inputValue,
              modalInputErrorListPrice: false
            })
          } else {
            this.setState({
              list_price: inputValue,
              modalInputErrorListPrice: true
            })
          }
        } else {
          this.setState({
            list_price: inputValue,
            modalInputErrorListPrice: false
          })
        }
        break
      case 'categoryId':
        patt = /^[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            this.setState({
              category_id: inputValue,
              modalInputErrorCategoryId: false
            })
          } else {
            this.setState({
              modalInputErrorCategoryId: true
            })
          }
        } else {
          this.setState({
            modalInputErrorCategoryId: false
          })
        }
        break
      case 'virtual':
        this.setState({
          virtual: event.target.checked
        })
    }
  }

  handleInput (event, id) {
    const inputName = event.target.name
    const inputValue = event.target.value
    const { productos } = this.state
    let item = productos.find(item => item._id === id)
    let patt
    let res
    switch (inputName) {
      case 'name':
        this.setState({
          name: inputValue
        })
        break
      case 'brand':
        this.setState({
          brand: inputValue
        })
        break
      case 'price':
        patt = /^[0-9]*[.]?[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            item.inputErrorPrice = false
            this.setState({
              productos,
              price: inputValue
            })
          } else {
            item.inputErrorPrice = true
            this.setState({
              productos,
              price: inputValue
            })
          }
        } else {
          item.inputErrorPrice = false
          this.setState({
            productos,
            price: inputValue
          })
        }
        break
      case 'listPrice':
        patt = /^[0-9]*[.]?[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            item.inputErrorListPrice = false
            this.setState({
              productos,
              list_price: inputValue
            })
          } else {
            item.inputErrorListPrice = true
            this.setState({
              productos,
              list_price: inputValue
            })
          }
        } else {
          item.inputErrorListPrice = false
          this.setState({
            productos,
            list_price: inputValue
          })
        }
        break
      case 'categoryId':
        patt = /^[0-9]*$/gm
        res = patt.test(inputValue)
        if (inputValue !== '') {
          if (res) {
            item.inputErrorCategoryId = false
            this.setState({
              productos,
              category_id: inputValue
            })
          } else {
            item.inputErrorCategoryId = true
            this.setState({
              productos,
              inputErrorCategoryId: true
            })
          }
        } else {
          item.inputErrorCategoryId = false
          this.setState({
            productos,
            inputErrorCategoryId: false
          })
        }
        break
      case 'virtual':
        this.setState({
          productos,
          virtual: event.target.checked
        })
    }
  }

  openModal () {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal (event) {
    this.setState({
      modalIsOpen: false
    })
  }

  edit (event, id) {
    const { productos } = this.state
    const item = productos.find(item => item._id === id)
    item.clickEditButton = true
    item.clickSaveButton = false
    item.modeSaving = false
    this.setState({
      productos
    })
  }

  save (event, id) {
    const { productos } = this.state
    const item = productos.find(item => item._id === id)
    item.clickEditButton = false
    item.clickSaveButton = true
    item.clickCancelButton = false
    item.modeSaving = true
    this.setState({
      productos
    })
  }

  removeItem (id) {
    this.delete(id)
  }

  remove (event, id) {
    const { productos } = this.state
    const item = productos.find(item => item._id === id)
    item.clickRejectButton = true
    this.setState({
      productos
    })
  }

  cancelSaveConfirmationMsj (id) {
    const { productos } = this.state
    const item = productos.find(item => item._id === id)
    item.clickEditButton = false
    item.clickSaveButton = false
    item.clickCancelButton = true
    item.modeSaving = true
    this.setState({
      productos
    })
  }

  cancelRemoveConfirmationMsj (id) {
    const { productos } = this.state
    const item = productos.find(item => item._id === id)
    item.clickRejectButton = false
    this.setState({
      productos
    })
  }

  acceptSaveConfirmationMsj (event, id) {
    this.put(id)
  }

  acceptRemoveConfirmationMsj (id) {
    this.removeItem(id)
  }

  render () {
    const { productos } = this.state
    // if (this.state.modalIsOpen === false) {
    //   console.log(productos)
    // }
    return (
      <Container>
        <nav>
          <button className={styles.btnCrearProducto} onClick={this.openModal} >
            <i className='fas fa-plus' /><span>Crear producto</span>
          </button>
        </nav>
        <ModalCrearProducto
          onState={this.state}
          onCreate={this.handleCreate}
          onCloseModal={this.closeModal}
          onOpenModal={this.openModal}
          onHandleInput={this.handleInputModal}
          onInputErrorPrice={this.state.modalInputErrorPrice}
          onInputErrorListPrice={this.state.modalInputErrorListPrice}
          onInputErrorCategoryId={this.state.modalInputErrorCategoryId}
        />
        <TransitionGroup component={ListProducts}>
          {
            productos.map((item, index) => {
              return (
                <FadeTransition duration={1000} key={item._id}>
                  <li className={styles.board_item}>
                    <Product
                      key={index}
                      onState={this.state}
                      item={item}
                      onRemove={this.remove}
                      onEdit={this.edit}
                      onSave={this.save}
                      onHandleInput={this.handleInput}
                      onRemoveItem={this.removeItem}
                      onCancelSaveConfirmationMsj={this.cancelSaveConfirmationMsj}
                      onAcceptSaveConfirmationMsj={this.acceptSaveConfirmationMsj}
                      onCancelRemoveConfirmationMsj={this.cancelRemoveConfirmationMsj}
                      onAcceptRemoveConfirmationMsj={this.acceptRemoveConfirmationMsj}
                    />
                  </li>
                </FadeTransition>
              )
            })
          }
        </TransitionGroup>
      </Container>
    )
  }
}

export default App
