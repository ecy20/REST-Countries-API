import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from '../services/data.service';
@Pipe({
  name: 'countryfilter'
})

export class CountryfilterPipe implements PipeTransform {
  constructor(private dataService:DataService){}
  transform(values: any, searchTerm:string, continent:string) {
    searchTerm = searchTerm.toLowerCase()
    console.log(continent);
    const resultArray:any =[]
    
  if(searchTerm === '' && continent === 'Filter by Region'){
    return values
  }
  // if(searchTerm.length && continent === 'Filter by Region'){
  //   for (const item of values) {
  //     if (item.name.common.toLowerCase().includes(searchTerm)) {
  //       resultArray.push(item)
  //     }
  //   }
    
  // }
  if(searchTerm.length){
    if (continent != 'Filter by Region') {
      for (const item of values) {
        if (item.region.includes(continent)&&item.name.common.toLowerCase().includes(searchTerm)) {
          resultArray.push(item)
        }
      }
    } else {
      for (const item of values) {
        if (item.name.common.toLowerCase().includes(searchTerm)) {
          resultArray.push(item)
        }
      }
    }
  }


  if(continent != 'Filter by Region'){
    if (searchTerm.length) {
      for (const item of values) {
        if (item.region.toLowerCase().includes(continent)&&item.name.common.toLowerCase().includes(searchTerm)) {
          resultArray.push(item)
        }
      }
    } else {
      for (const item of values) {
        if (item.region.includes(continent)) {
          resultArray.push(item)
        }
      }
    }
  }
  if (resultArray) {
    this.dataService.doesNotExist.exist = true
    this.dataService.doesNotExist.term = searchTerm
    return resultArray
  }
  this.dataService.doesNotExist.exist = false
  return resultArray
  }

}
