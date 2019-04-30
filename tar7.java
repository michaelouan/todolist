package tar7;

import java.util.ArrayList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		ArrayList<String> myDico = new ArrayList<String>();
		
		Scanner scan= new Scanner(System.in);

		System.out.println("Enter words for stop enter 999");
		String str=scan.nextLine();
		myDico.add(str);
		while(!(str.equals("999"))) {
		    str=scan.nextLine();
			myDico.add(str);
		}
		
		System.out.println("enter a word to search");
		String str1 = scan.nextLine();
		
		for (String string : myDico) {
			if(getValue(str1) == getValue(string)) {
				System.out.println("- :" + string);
			}
		}
	}
	
	public static int getValue(String s) {
		int a = 1;
		for (int i = 0; i < s.length(); i++) {
			a *= (int)s.charAt(i);
		}
		return a;
	}

}
