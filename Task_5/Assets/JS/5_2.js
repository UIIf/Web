function recursion(parent_node)
{
    console.log(parent_node);
    let s = parent_node.children

    if (s.length > 0)
    {
        for( let i = 0; i < s.length; i++)
            recursion(s[i]);
    }
}

recursion(document.getElementById("html"));