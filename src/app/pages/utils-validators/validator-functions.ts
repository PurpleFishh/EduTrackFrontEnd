import { AbstractControl } from "@angular/forms";

export function mustContainEmailDomain (control: AbstractControl) {
    if(control.value.includes('@') && control.value.split('@')[1].includes('.')) {
      return null;
    }
    return {doesNotContainEmailDomain: true};
  }
  
 export function mustContainAtLeastOneSpecialCharacter (control : AbstractControl) {
  
    if(control.value.includes('!') || control.value.includes('@') || control.value.includes('#') ||
       control.value.includes('$') || control.value.includes('%') || control.value.includes('&') ||
       control.value.includes('*') || control.value.includes('?')) 
    {
      return null;
    }
  
    return {doesNotContainSpecialCharacter : true};
  }