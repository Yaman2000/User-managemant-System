import { CommonModule } from '@angular/common';
import { Component , OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ExpenseService } from '../../core/services/expense.service';
import { ReactiveFormsModule } from '@angular/forms';
import { IExpense } from '../../core/models/common.model';
import { ActivatedRoute , Router } from '@angular/router';

@Component({
  selector: 'app-expense',
  standalone: true,
  imports: [RouterModule, CommonModule , ReactiveFormsModule],
  templateUrl: './expense.component.html',
  styleUrl: './expense.component.scss'
}) 


export class ExpenseComponent implements OnInit {
   expenses: IExpense[] = [];
   totalExpenses = 0;
   constructor(private expenseService: ExpenseService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}
  
ngOnInit(): void{
  this.getAllExpenses();
 }

getAllExpenses(){
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data)=>{
      this.expenses = [];

      data.forEach((item)=>{
        let expense = item.payload.toJSON() as IExpense;
        this.totalExpenses += parseInt(expense.price);

        this.expenses.push({
          key: item.key || '',
          title: expense.title,
          description: expense.description,
          price: expense.price,
        });
      });
      },
    })}
    
    editExpense(key: string){
      this.router.navigate(['/expense-form/' + key]);
    }

    removeExpense(key: string){
      if(window.confirm('Are you sure ?')){
        this.expenseService.deleteExpense(key);
      }
     
    }

}
