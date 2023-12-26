 export default function addProductPage (){
    return(
       <div>
        <h1 className="text-lg mb-3 font-bold">Add Product</h1>
        <form>
            <input
                required //veri giriş alanının kesin doldurulması gerektiğini belirtir
                name="name"
                placeholder="Name"
                className="input-bordered  input mb-3 w-full"
            />
            <textarea
            required
            name="description"
            placeholder="Description"
            className="textarea textarea-bordered mb-3 w-full"
            />

            <input
                required 
                name="imageUrl"
                placeholder="Image URL"
                type="url"
                className="input-bordered  input mb-3 w-full"
            />

            <input
                required 
                name="price"
                placeholder="Price"
                type="number"
                className="input-bordered  input mb-3 w-full"
            />
            <button className="btn btn-primary btn-block" type="submit">Add Product</button>
        </form>
       </div>
    )
    
 }