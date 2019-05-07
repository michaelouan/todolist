package tar1;

import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

		Scanner scan= new Scanner(System.in);

		System.out.println("Enter a number");
		int num=scan.nextInt();
		
		String a="";
		int helpp;
		while (num > 0)
		{
			helpp = (((num - 1) % 26));
			a+=(char)(helpp + 65);
			num = (num - helpp) / 26;
		}
		
		String b = new StringBuffer(a).reverse().toString();
		System.out.println(b);
		  
	}
}
