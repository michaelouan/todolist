package tar5;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Scanner;

public class main {

	public static void main(String[] args) {

		ArrayList<Integer> myLists = new ArrayList<Integer>();
		ArrayList<Integer> myList = new ArrayList<Integer>();
		System.out.println("Enter numbers");
		
		int a;
		Scanner S=new Scanner(System.in);
		a=S.nextInt();
		
		while(a != 999) {
			myList.add(a);
			a=S.nextInt();
		}
		
		while(myList.size() != 0) {
		
			for (int i = 0; i < myList.size(); i++) {
				if(!(myLists.contains(myList.get(i)))) {
					myLists.add(myList.get(i));
					myList.remove(i);
					i--;
				}
			}
			System.out.print("{");
			int count =0;
			for (Integer integer : myLists) {
				count++;
				if(count == myLists.size()) {
					System.out.print(integer);
				} else {
					System.out.print(integer +",");	
				}
			}
			System.out.print("}");
			myLists.clear();
		}
		
		
	}

}
