# MITD - Assestment
# Author: Flavio Montesano - fmontesano@gmail.com
# Exercise 1 - Given a n-dimensional list in input, return a flattened 1-dimensional output


# flatten_me flattens any list/set/tuple/range and its subests in a 1-dimension list
# param :my_list: is the input list/subset
# :return: a list with flattened elements

def flatten_me(my_list):
    out_list = []
    for elem in my_list:
        if isinstance(elem, (type(list), type(set), type(tuple), type(range))):
            out_list.extend(flatten_me(elem))
        else:
            print(type(elem))
            out_list.append(elem)
    return out_list


multin_list = [[1, 2, [3]], 4, ["test", 1]]
print("Flattened: %s" % (flatten_me(multin_list)))
