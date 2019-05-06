package tar4;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ArrayList<Integer> firstArray = new ArrayList<Integer>();
		ArrayList<Integer> secondArray = new ArrayList<Integer>();
		
		Scanner scan= new Scanner(System.in);

		System.out.println("Enter numbers of first array for stop enter 99");
		Integer num=scan.nextInt();
		firstArray.add(num);
		while(num!= 99) {
			num=scan.nextInt();
			firstArray.add(num);
		}		
		
		
		System.out.println("Enter numbers of second array for stop enter 99");
		Integer number=scan.nextInt();
		secondArray.add(number);
		while(number!= 99) {
			number=scan.nextInt();
			secondArray.add(number);
		}
		
		boolean is = true;
		
		if(firstArray.size() < secondArray.size()) {
			for (Integer integer : secondArray) {
				if(!firstArray.contains(integer)) {
					is = false;
					break;
				} 
			}			
		} else {
			for (Integer integer : firstArray) {
				if(!secondArray.contains(integer)) {
					is = false;
					break;
				} 
			}	
		}
				
		System.out.println(is);
		
	}

}
