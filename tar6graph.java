package tar6;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Scanner;

public class Main {

	public static void main(String[] args) {

	    HashMap<String, LinkedList<String>> myGraph = new HashMap<String, LinkedList<String>>();

		Scanner scan= new Scanner(System.in);

		System.out.println("Enter node name for stop enter 999");
		String str=scan.nextLine();
		
		while(!(str.equals("999"))) {

			System.out.println("Enter the neighbourgs of this node to stop enter 99");
			String neighbourgs = scan.nextLine();

			LinkedList<String> neighbourghs = new LinkedList<String>();

			while(!neighbourgs.equals("99")) {

				if(!myGraph.containsKey(neighbourgs)) {
					System.out.println("thie node doesnt exist");
				} else {
					neighbourghs.add(neighbourgs);
				}	
				
				System.out.println("Enter the neighbourgs of this node to stop enter 99");
				 neighbourgs = scan.nextLine();

			}
			
			myGraph.put(str, neighbourghs);
			System.out.println("Enter node name for stop enter 999");	
			str=scan.nextLine();
			
		}
		
		HashMap<String, LinkedList<String>> myGraph1 = new HashMap<String, LinkedList<String>>();
		
		for (String string : myGraph.keySet()) {
			LinkedList<String> neigh = new LinkedList<String>();
			neigh.addAll(myGraph.get(string));
			for (String string2 : myGraph.keySet()) {
				if(myGraph.get(string2).contains(string)) {
					neigh.add(string2);
				}
			}
			myGraph1.put(string, neigh);
		}
		
		for (String string : myGraph1.keySet()) {
		System.out.print(string);
		System.out.print("--->");
			for (String string2 : myGraph1.get(string)) {
				System.out.print(string2 + " ");
			}
			System.out.println("");
	}
		
		System.out.println("Enter a node name");
		String node = scan.nextLine();
		
		System.out.println("Enter number for max chemin neighbourg");
		int a = scan.nextInt();
		


		ArrayList<String> myNeighbourg = new ArrayList<String>();
		ArrayList<String> myNeighbourg1 = new ArrayList<String>();
		myNeighbourg.addAll(myGraph1.get(node));
		myNeighbourg1.addAll(myGraph1.get(node));
		while(a>1) {
			for (String string2 : myNeighbourg1) {
				for (String string : myGraph1.get(string2)) {
					if(!myNeighbourg.contains(string) && !string.contentEquals(node)) {
						myNeighbourg.add(string);
					}
				}
			}
			
			myNeighbourg1.clear();
			myNeighbourg1.addAll(myNeighbourg);
			a--;
		}
		
		for (String string : myNeighbourg) {
		System.out.println(string + " ");
	}
		
	}

}
