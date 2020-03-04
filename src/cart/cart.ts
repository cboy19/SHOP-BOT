import { Items, Carts ,Requisition } from "../cards/types";
import * as _ from "lodash";
import { items } from "../data/items";


export class Cart {

    private cart: Carts[] = [];
    private initial = 0;
    private static index = 0;
    

    addItem(item: Items){
        const cartItem= this.cart.find(cartItems => cartItems.supplierpartId === item.supplierpartId)
        if(cartItem) {  
            cartItem.quantity = (+cartItem.quantity + +item.quantity).toString(); 
            cartItem.subtotal = (+cartItem.quantity * +cartItem.price).toString();
                     }
        else { 
            var tempCart = <Carts>{};
            item.subtotal = (+item.quantity * +item.price).toString();
            Object.assign(tempCart,item); 
     //       tempCart.index = tempCart.index ? tempCart.index : this.initial.toString();
            tempCart.index =  Cart.index.toString();  //(this.getCount()).toString();
            this.cart.push(tempCart); 
            Cart.index++;
             }
    }

    deleteItem(ind:number){
        _.remove(this.cart, function(item){
            return item.index === ind.toString();
        });
    }

    getcalculateTotal(){
        return _.sumBy(this.cart, item=> Number(item.subtotal));
    }

    clear(){
        this.cart = [];
    }

    getCart(){
        return this.cart;   
    }

    getCount(){
        return this.cart.length;
    }

    updateCart(value){

        let myIndex = 0;  
        let myCart  =  this.cart.slice(); 
        let currectCart = this.cart;                                  
        Object.keys(value).map(function (key) { 
            if (key.includes("quantity")){
                if (value[key] !== myCart[myIndex].quantity){                               
                    if (value[key] > 0){
                        _.forEach(currectCart, function (item) {
                            if (+item.index == myIndex) {
                              item.quantity = value[key];
                              item.subtotal = (+item.price * value[key]).toString();
                            }
                          });
                        }
                        else{
                            currectCart.splice(myIndex, 1);  
                        }
                   
                   // cartInstance.updateCart(myCart[myIndex].index,value[key])
                }
                myIndex++;
            }
            
        });     




    }



}







