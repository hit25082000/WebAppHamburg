const Items = {
  itemList: [
  {
    img: "img/hamburg.png",
    name: "X - Bacon",
    value: 30.55,
    count: 0
  },
  {
    img: "img/hamburg.png",
    name: "X - Salada",
    value: 50.50,
    count: 0
  }
],

linkWhats: "",

Real: new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
}),

  Render(){
    var itemListHtml = document.querySelector(".card-list")
    itemListHtml.innerHTML = "";
    this.itemList.forEach((item,i)=>{
      itemListHtml.innerHTML += `<li class="card-item">
      <img src="${item.img}" class="img-fluid" alt="" width="100" />
      <div class="card-item-content">
        <h2 class="title-item">
        ${item.name}
        </h2>
        <button onclick="Items.Remove('${i}')">-</button>
        <p id="${i}" class="count">0<span></span></p>
        <button onclick="Items.Add('${i}')">+</button>
        <p><b class="${i}Value">${this.Real.format(item.value)}</b></p>
      </div>
      </li>`
    })
  },

  Remove(index){
    var count = parseFloat(document.getElementById(index).innerHTML)
    var item = this.itemList[index]

    if(count - 1 < 0){
      return;
    }
    item.count = count - 1
    document.getElementById(index).innerHTML = item.count

    this.TotalSum()
    this.RenderCart()
  },

  Add(index){
    var count = parseFloat(document.getElementById(index).innerHTML)
    var item = this.itemList[index]
    item.count = count + 1
    
    document.getElementById(index).innerHTML = item.count

    this.TotalSum()
    this.RenderCart()
  },

  RenderCart(){
    var cartListHtml = document.querySelector(".cart-list")
    cartListHtml.innerHTML = "";
    this.itemList.forEach((item)=>{
      if(item.count > 0){
        cartListHtml.innerHTML +=    
        `<li class="cart-item">
        <img src="${item.img}" class="img-fluid" alt="" width="100" />
        <div class="card-item-content">
        <p>
        ${item.name}
        </p>
        <p class="count">Quantidade: <span>${item.count}</span></p>
        <p>${this.Real.format(item.value)}</p>
        </div>
        </li>`
      }
    })
  },

  TotalSum(){
    var totalSumHtml = document.querySelector('#total-value');
    var linkHtml = document.getElementById('SendOrder');
    var totalSum = 0;
    var link = "";
    this.itemList.forEach(function (item) {
      totalSum += item.count * item.value

      if(item.count > 0){
        if(link != ""){
          link += "%20E%20"
        }
        link += `${item.count}%20${item.name}%20Por%20Favor`
      }
    });
    if(totalSum > 0){
      link += `no%20total%20de%20R%24%3A${totalSum}%20`
      this.linkWhats = `https://wa.me/556781248764?text=Boa%20Noite%20vou%20querer%20` + link
      linkHtml.href = this.linkWhats;
    }

    totalSumHtml.innerHTML = this.Real.format(totalSum)
  }, 
}

Items.Render()