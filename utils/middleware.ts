const last = (a : any[]) => a[a.length - 1]
const reduce = (a : any[]) => a.slice(0, -1)

class Middleware {
    use (method : Callback) {
      this.go = ((stack) => (...args : any) => stack(...reduce(args), () => {
        const next = last(args)
        //@ts-ignore
        method.apply(this, [...reduce(args), next.bind.apply(next, [null, ...reduce(args)])])
      }))(this.go)
    }
  
    go (...args : any) {
      
        
      last(args).apply(this, reduce(args))
    }
  }

    
export default Middleware