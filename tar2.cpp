#include<iostream>
using namespace std;

int countOccurrences(int arr[], int n, int x);
int binarySearch(int arr[], int l, int r, int x);

int main()
{
	int arr[10];
	int x;

	for (int i = 0; i < 10; i++) {
		cin >> arr[i];
	}
	cout << "Enter a number" << endl;
	cin >> x;

	cout <<"The number "<<x<<" appear "<< countOccurrences(arr, 10, x) <<" times"<<endl;
}

int binarySearch(int arr[], int l, int r, int numToSearch)
{
	int middle = l + (r - l) / 2;

	if (r < l)
	{
		return -1;
	}
	else if (arr[middle] == numToSearch)
	{
		return middle;
	}
	else if (arr[middle] > numToSearch)
	{
		return binarySearch(arr, l, middle - 1, numToSearch);
	}

	return binarySearch(arr, middle + 1, r, numToSearch);
}

int countOccurrences(int arr[], int ArrayLength, int numToSearch)
{
	int index = binarySearch(arr, 0, ArrayLength - 1, numToSearch);
	int count = 1;
	int left = index - 1;
	int right = index + 1;

	if (index == -1)
	{
		return 0;
	}
		
	while (arr[left] == numToSearch)
	{
		count++;
		left--;
	}

	while (arr[right] == numToSearch)
	{
		count++;
		right++;
	}

	return count;
}
