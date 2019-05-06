#include<iostream>
using namespace std;

void main()
{
	int arr[10];
	int number = 0;
	int count = 0;

	for (int i = 0; i < 10; i++)
	{
		cin >> arr[i];
	}

	int i = 0;
	while (i < 10)
	{
		while (arr[i] == number)
		{
			i++;
			count++;
		}
		if (count != 0)
		{
			cout << "The number " << number << " appear " << count << " times" << endl;
			count = 0;
		}
		number++;
	}
}
