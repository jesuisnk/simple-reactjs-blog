/**
* Name: CamQuayTay ReactJS on SMM
* Date: 29/08/2023
* Author: valedrat
*/

/* Extension */
function slugVN(text) {
    const diacriticsMap = [
        { base: 'a', regex: /[àáảãạăắằẵặẳâầấậẫẩ]/g },
        { base: 'e', regex: /[èéẻẽẹêếềễệể]/g },
        { base: 'i', regex: /[ìíỉĩị]/g },
        { base: 'o', regex: /[òóỏõọôồốổỗộơờớởỡợ]/g },
        { base: 'u', regex: /[ùúủũụưừứửữự]/g },
        { base: 'y', regex: /[ỳýỷỹỵ]/g },
        { base: 'd', regex: /[đ]/g },
        { base: ' ', regex: /[\s]/g }
    ];

    let slug = text.toLowerCase();

    for (const diacritic of diacriticsMap) {
        slug = slug.replace(diacritic.regex, diacritic.base);
    }

    slug = slug.replace(/[^\w\s-]/g, ''); // Remove any non-word characters
    slug = slug.replace(/[\s_-]+/g, '-'); // Replace whitespace and underscores with a single hyphen
    slug = slug.replace(/^-+|-+$/g, ''); // Trim leading/trailing hyphens

    return slug;
}
function smile(string) {
    const arrEmoName = ['ami', 'anya', 'aru', 'aka', 'dauhanh', 'dora', 'le', 'menhera', 'moew', 'nam', 'pepe', 'qoobee', 'qoopepe', 'thobaymau', 'troll', 'dui', 'firefox', 'conan'];

    arrEmoName.forEach(emoName => {
        const pattern = new RegExp('[:]' + emoName + '([0-9]*):', 'g');
        const replacement = '<img loading="lazy" src="https://dorew-site.github.io/assets/smileys/' + emoName + '/' + emoName + '$1.png" alt="$1"/>';
        string = string.replace(pattern, replacement);
    });

    return string;
}
function bb_simple(nd) {
    const replacements = [
        [/\[url=([^\]]+)](.*?)\[\/url\]/g, "<i class='fa fa-link fa-spin'></i><a rel='nofollow' href='$1'>$2</a>"],
        [/\[img\](.*?)\[\/img\]/g, '<div style="text-align:center"><a href="$1" class="swipebox"><img class="bb_img LoadImage" src="$1" border="2" onerror="this.onerror=null;this.src=\'https://i.imgur.com/806SpRu.png\'" style="max-width:50%"/></a></div>'],
        [/\[vid\](.*?)\[\/vid\]/g, '<div class="video-wrapper" style="text-align: center;"><iframe loading="lazy" src="/plugin/video?link=$1" height="315" width="560" scrolling="no" allowfullscreen="" frameborder="0"></iframe></div>'],
        [/\[d\](.*?)\[\/d\]/g, '<center><a href="$1"><button class="btn btn-primary"><i class="fa fa-download"></i> Download</button></a></center>'],
        [/\[(b|i|u|s|h1|h2|h3|h4|h5|h6|strong|em)](.*?)\[\/\1]/g, '<$1>$2</$1>'],
        [/\[(center|left|right)](.*?)\[\/\1]/g, '<div style="text-align:$1;">$2</div>'],
        [/\[(red|blue|purple|green|orange|darkorange)](.*?)\[\/\1]/g, '<span style="color:$1;">$2</span>'],
        [/\[color=(.+?)\](.*?)\[\/color\]/g, '<span style="color:$1;">$2</span>'],
        [/\[bcolor=(.+?)\](.*?)\[\/bcolor\]/g, '<span style="color:$1;font-weight:700">$2</span>'],
    ];

    replacements.forEach(([pattern, replacement]) => {
        nd = nd.replace(pattern, replacement);
    });

    const search = [
        /(\r\n|[\r\n])/g,
        /\[small](.+?)\[\/small]/gis,
        /\[big](.+?)\[\/big]/gis,
        /\[quote](.+?)\[\/quote]/gis,
        /\[\*](.+?)\[\/\*]/gis,
        /\[spoiler=(.+?)](.+?)\[\/spoiler]/gis
    ];

    const replace = [
        '',
        '<span style="font-size:x-small">$1</span>',
        '<span style="font-size:large">$1</span>',
        '</p><div class="quote"><blockquote>$1</blockquote></div><p>',
        '</p><div class="bblist">$1</div><p>',
        '</p><div><div class="spoilerhead" onclick="var _n=this.parentNode.getElementsByTagName(\'div\')[1];if(_n.style.display==\'none\'){_n.style.display=\'\';}else{_n.style.display=\'none\';}">$1 (+/-)</div><div class="spoilerbody" style="display:none">$2</div></div><p>'
    ];

    for (let i = 0; i < search.length; i++) {
        nd = nd.replace(search[i], replace[i]);
    }

    return nd;
}
function bbcode(nd) {
    nd = nd.replace(/(\r\n|\r|\n)/g, '<br>');
    nd = smile(nd);
    nd = bb_simple(nd);
    return nd;
}
// time ago
function ago(time_ago) {
    const now = Math.floor(Date.now() / 1000) - 1160;
    const timeAgo = Math.floor(time_ago / 1000) - 1160;
    const timeht = Math.floor(new Date().getTime() / 1000);
    const time = Math.floor(timeAgo);
    const timeGiay = timeht - time;
    const timePhut = Math.floor(timeGiay / 60);
    const timeDay = Math.floor((timeht - time) / 86400);

    const fullDate = new Date(timeAgo * 1000);
    const options = { timeZone: 'Asia/Ho_Chi_Minh', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fulltime = fullDate.toLocaleDateString('en-US', options).replace(',', ' -');
    const minitime = fullDate.toLocaleTimeString('en-US', options);

    if (timeDay === 0) {
        if (timeGiay <= 60) {
            return timeGiay + ' giây trước';
        } else if (timePhut <= 60) {
            return timePhut + ' phút trước';
        } else {
            return 'Hôm nay, ' + minitime;
        }
    } else if (timeDay === 1) {
        return 'Hôm qua, ' + minitime;
    } else {
        return fulltime;
    }
}
// paginate
function paging(trang, p, max, b) {
    let result = '';

    if (max > 1) {
        result += '<center>';
        result += '<div class="pagination">';

        const a = '<a class="pagenav" href="' + trang;

        if (p > max) {
            p = max;
        }

        if (p > 1) {
            result += a + (p - 1) + b + '">«</a>';
        }

        if (p > 3) {
            result += a + '1' + b + '">1</a>';
        }

        if (p > 4) {
            result += '<span>...</span>';
        }

        if (p > 2) {
            result += a + (p - 2) + b + '">' + (p - 2) + '</a>';
        }

        if (p > 1) {
            result += a + (p - 1) + b + '">' + (p - 1) + '</a>';
        }

        result += '<span class="current"><b>' + p + '</b></span>';

        if (p < max - 1) {
            result += a + (p + 1) + b + '">' + (p + 1) + '</a>';
        }

        if (p < max - 2) {
            result += a + (p + 2) + b + '">' + (p + 2) + '</a>';
        }

        if (p < max - 3) {
            result += '<span>...</span>';
        }

        if (p < max) {
            result += a + max + b + '" class="next">' + max + '</a>';
        }

        if (p < max) {
            result += a + (p + 1) + b + '">»</a>';
        }

        result += '</div>';
        result += '</center>';
    }

    return result;
}
// cookie
function set_cookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function delete_cookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
function get_cookie(name) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
}
// encrypt
function camquaytay_btoa(input) {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    return btoa(String.fromCharCode.apply(null, data));
}
function camquaytay_atob(encodedInput) {
    const decodedData = atob(encodedInput);
    const decoder = new TextDecoder();
    const decodedString = decoder.decode(
        new Uint8Array(decodedData.split('').map(char => char.charCodeAt(0)))
    );
    return decodedString;
}
//login
function checkLoginStatus(callback) {
    $.getJSON(camquaytay_atob(api.auth), function (data) {
        // Kiểm tra dữ liệu trả về từ tệp JSON
        if (data.auth === "true") {
            callback(true); // Gọi callback với trạng thái đăng nhập là true
        } else {
            callback(false); // Gọi callback với trạng thái đăng nhập là false
        }
    }).fail(function () {
        callback(false); // Xử lý lỗi bằng cách gọi callback với trạng thái đăng nhập là false
    });
}

/* Template */
function Manager() {
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        checkLoginStatus((status) => {
            setIsLoggedIn(status);
        });
    }, []);

    return (
        <div className="mainblock">
            {isLoggedIn ? (
                <>
                    <div className="phdr" style={{ fontWeight: 700 }}>
                        <i className="fa fa-tachometer" aria-hidden="true"></i> Bảng quản trị
                    </div>
                    <div className="list1">
                        <i className="fa fa-pencil-square" aria-hidden="true"></i> <a href="#/manager/p/blog/creator">Viết bài mới</a>
                    </div>
                    <div className="list1">
                        <i className="fa fa-cube" aria-hidden="true"></i> <a href="#/manager/p/category/creator">Quản lý chuyên mục</a>
                    </div>
                </>
            ) : (
                <Login />
            )}
        </div>

    );
}

// category manager
class ManagerCategoryCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            title: '',
        };
    }

    componentDidMount() {
        this.fetchCategories();
    }

    fetchCategories = () => {
        // Gửi yêu cầu GET đến api để lấy danh sách chuyên mục
        fetch(camquaytay_atob(api.CategoryList))
            .then((response) => response.json())
            .then((data) => {
                this.setState({ categories: data });
            })
            .catch((error) => {
                console.error('Đã xảy ra lỗi khi lấy danh sách chuyên mục:', error);
            });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const title = $("#title").val();
        const slug = slugVN(title);

        // Gửi yêu cầu POST đến api
        $.ajax({
            url: camquaytay_atob(api.CategoryCreator),
            type: 'POST',
            data: { title: title, slug: slug },
            dataType: 'json',
            success: function (data) {
                // Kiểm tra dữ liệu JSON trả về
                if (data.result === "true") {
                    window.location.reload();
                } else {
                    alert(data.msg);
                }
            },
            error: function () {
                alert('Đã xảy ra lỗi khi gửi yêu cầu tạo chuyên mục');
            }
        });
    };

    render() {
        const { categories, title } = this.state;

        return (
            <>
                <div className="mainblock">
                    <div className="phdr">
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        {` Tạo chuyên mục (Tối đa 70 kí tự)`}
                    </div>
                    <div className="menu">
                        <form onSubmit={this.handleSubmit}>
                            <p>
                                <input
                                    className="w3-input"
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    required
                                />
                            </p>
                            <p style={{ textAlign: 'center' }}>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Xác nhận
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
                <div className="mainblock">
                    <div className="phdr" style={{ fontWeight: '700' }}>
                        <i className="fa fa-bars"></i> Danh sách
                    </div>
                    {categories.map((category, index) => (
                        <div className="list1" key={index}>
                            <div style={{ float: 'right' }}>
                                [ <a href={`#/manager/p/category/delete?id=${category.id}`}>
                                    <i className="fa fa-trash-o" aria-hidden="true"></i> Xoá
                                </a> ]
                            </div>
                            <a href={`#/category/${category.slug}`}>
                                <i className="fa fa-cube" aria-hidden="true"></i> {category.title}
                            </a> ({category.count})
                        </div>
                    ))}
                </div>
            </>
        );
    }
}
class ManagerCategoryDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategory: null
        };
    }

    componentDidMount() {
        // lọc category theo id từ api
        $.ajax({
            url: camquaytay_atob(api.CategoryList),
            dataType: 'json',
            success: (data) => {
                const postCategory = data.find(postCategory => postCategory.id === this.props.id);
                if (!postCategory) {
                    alert('Bài viết không tồn tại');
                    window.location.href = '/#';
                } else {
                    this.setState({ postCategory });
                }
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    handleDelete = () => {
        // gửi yêu cầu đến api
        $.ajax({
            url: camquaytay_atob(api.CategoryDelete) + '?id=' + this.props.id,
            type: 'POST',
            data: { 'submit': 'ok' },
            dataType: 'json',
            success: (data) => {
                if (data.result === 'false') {
                    alert(data.msg)
                } else {
                    window.location.href = '/#'
                }
            },
            error: () => {
                alert('Đã xảy ra lỗi khi gửi yêu cầu xóa chuyên mục');
            }
        });
    };

    render() {
        const { postCategory } = this.state;
        return (
            <div className="mainblock">
                <div className="phdr">
                    <a href="#/">
                        <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
                    </a>
                    {" / "}
                    {postCategory && (
                        <a href={`#/category/${postCategory.slug}`}>{postCategory.title}</a>
                    )}
                </div>
                <div className="menu" style={{ textAlign: "center", marginBottom: "5px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Bạn có thực sự muốn xóa chuyên mục này không?</h1>
                    </div>
                    {postCategory && (
                        <p>
                            <button onClick={this.handleDelete} className="button">Xác nhận</button>
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

// blog manager
class ManagerBlogCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: "",
            title: "",
            content: ""
        };
    }

    componentDidMount() {
        $.ajax({
            url: camquaytay_atob(api.CategoryList),
            dataType: 'json',
            success: (data) => {
                this.setState({ categories: data });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    handleCategoryChange = (e) => {
        this.setState({ selectedCategory: e.target.value });
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleContentChange = (e) => {
        this.setState({ content: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { selectedCategory, title, content } = this.state;
        const slug = slugVN(title);

        // Gửi yêu cầu POST đến api
        $.ajax({
            url: camquaytay_atob(api.BlogCreator),
            type: 'POST',
            data: { category: selectedCategory, title: title, slug: slug, content: content },
            dataType: 'json',
            success: function (data) {
                if (data.result === 'false') {
                    alert(data.msg)
                } else {
                    window.location.href = '/#'
                }
            },
            error: function () {
                alert('Đã xảy ra lỗi khi gửi yêu cầu đăng bài viết');
            }
        });
    };

    render() {
        const { categories } = this.state;
        return (
            <div className="mainblock">
                <div className="phdr">
                    <i className="fa fa-pencil" aria-hidden="true"></i> Viết bài mới
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="menu">
                        <b><i className="fa fa-gg" aria-hidden="true"></i> Tiêu đề:</b>
                        <p><input className="w3-input w3-border" type="text" onChange={this.handleTitleChange} maxLength="300" style={{ height: '100%', width: '100%' }} /></p>
                    </div>
                    <div className="menu">
                        <b><i className="fa fa-bars"></i> Chuyên mục:</b>
                        <p>
                            <select id="category" className="form-control" onChange={this.handleCategoryChange}>
                                <option value="">Chọn chuyên mục</option>
                                {categories.map((category, index) => (
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>
                        </p>
                    </div>
                    <div className="menu">
                        <b><i className="fa fa-newspaper-o" aria-hidden="true"></i> Nội dung:</b>
                        <p>
                            <textarea id="content" rows="15" onChange={this.handleContentChange}></textarea>
                        </p>
                    </div>
                    <div className="menu" style={{ textAlign: 'center' }}>
                        <button type="submit" className="button">Đăng bài</button>
                    </div>
                </form>
            </div>
        );
    }
}
class ManagerBlogEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: "",
            title: "",
            content: ""
        };
    }

    componentDidMount() {
        // Check if blog with id exists
        $.ajax({
            url: camquaytay_atob(api.BlogList),
            dataType: 'json',
            success: (data) => {
                const blog = data.find(blog => blog.id === this.props.id);
                if (!blog) {
                    alert('Bài viết không tồn tại');
                    window.location.href = '/#'; // Redirect to homepage
                } else {
                    // Set initial state with blog data
                    this.setState({
                        selectedCategory: blog.category,
                        title: blog.title,
                        slug: blog.slug
                    });
                    // Fetch categories
                    this.fetchCategories();
                    // Fetch old content
                    this.fetchOldContent();
                }
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    fetchCategories = () => {
        $.ajax({
            url: camquaytay_atob(api.CategoryList),
            dataType: 'json',
            success: (data) => {
                this.setState({ categories: data });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    fetchOldContent = () => {
        $.ajax({
            url: camquaytay_atob(api.BlogContent) + '?slug=' + this.state.slug,
            dataType: 'text',
            success: (data) => {
                this.setState({ content: data });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    handleCategoryChange = (e) => {
        this.setState({ selectedCategory: e.target.value });
    };

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    handleContentChange = (e) => {
        this.setState({ content: e.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { selectedCategory, title, content } = this.state;
        const slug = slugVN(title);

        // Send POST request to api for editing blog
        $.ajax({
            url: camquaytay_atob(api.BlogEdit) + '?id=' + this.props.id,
            type: 'POST',
            data: { category: selectedCategory, title: title, slug: slug, content: content },
            dataType: 'json',
            success: function (data) {
                if (data.result === 'false') {
                    alert(data.msg)
                } else {
                    window.location.href = '/#/blog/' + slug
                }
            },
            error: function () {
                alert('Đã xảy ra lỗi khi gửi yêu cầu chỉnh sửa bài viết');
            }
        });
    };

    render() {
        const { categories } = this.state;
        return (
            <div className="mainblock">
                <div className="phdr">
                    <i className="fa fa-pencil" aria-hidden="true"></i> Sửa bài viết
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className="menu">
                        <b><i className="fa fa-gg" aria-hidden="true"></i> Tiêu đề:</b>
                        <p><input className="w3-input w3-border" type="text" value={this.state.title} onChange={this.handleTitleChange} maxLength="300" style={{ height: '100%', width: '100%' }} /></p>
                    </div>
                    <div className="menu">
                        <b><i className="fa fa-bars"></i> Chuyên mục:</b>
                        <p>
                            <select id="category" className="form-control" value={this.state.selectedCategory} onChange={this.handleCategoryChange}>
                                <option value="">Chọn chuyên mục</option>
                                {categories.map((category, index) => (
                                    <option key={category.id} value={category.id}>{category.title}</option>
                                ))}
                            </select>
                        </p>
                    </div>
                    <div className="menu">
                        <b><i className="fa fa-newspaper-o" aria-hidden="true"></i> Nội dung:</b>
                        <p>
                            <textarea id="content" rows="15" value={this.state.content} onChange={this.handleContentChange}></textarea>
                        </p>
                    </div>
                    <div className="menu" style={{ textAlign: 'center' }}>
                        <button type="submit" className="button">Sửa bài viết</button>
                    </div>
                </form>
            </div>
        );
    }
}
class ManagerBlogDelete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: null,
            postCategory: null
        };
    }

    componentDidMount() {
        // lọc blog theo id từ api
        $.ajax({
            url: camquaytay_atob(api.BlogList),
            dataType: 'json',
            success: (data) => {
                const blog = data.find(blog => blog.id === this.props.id);
                if (!blog) {
                    alert('Bài viết không tồn tại');
                    window.location.href = '/#';
                } else {
                    this.setState({ blog });
                    this.fetchPostCategory(blog.category);
                }
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    fetchPostCategory = (category) => {
        // lọc chuyên mục theo id từ api
        $.ajax({
            url: camquaytay_atob(api.CategoryList),
            dataType: 'json',
            success: (data) => {
                const postCategory = data.find(item => item.id === category);
                this.setState({ postCategory });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    handleDelete = () => {
        // gửi yêu cầu đến api
        $.ajax({
            url: camquaytay_atob(api.BlogDelete),
            type: 'POST',
            data: { id: this.props.id },
            dataType: 'json',
            success: (data) => {
                if (data.result === 'false') {
                    alert(data.msg)
                } else {
                    window.location.href = '/#'
                }
            },
            error: () => {
                alert('Đã xảy ra lỗi khi gửi yêu cầu xóa bài viết');
            }
        });
    };

    render() {
        const { blog, postCategory } = this.state;
        return (
            <div className="mainblock">
                <div className="phdr">
                    <a href="#/">
                        <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
                    </a>
                    {" / "}
                    {postCategory && (
                        <a href={`#/category/${postCategory.slug}`}>{postCategory.title}</a>
                    )}
                    {" / "}
                    {blog && (
                        <a href={`#/blog/${blog.slug}`}>{blog.title}</a>
                    )}
                </div>
                <div className="menu" style={{ textAlign: "center", marginBottom: "5px" }}>
                    <div style={{ marginBottom: "20px" }}>
                        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>Bạn có thực sự muốn xóa bài viết này không?</h1>
                    </div>
                    {blog && (
                        <p>
                            <button onClick={this.handleDelete} className="button">Xác nhận</button>
                        </p>
                    )}
                </div>
            </div>
        );
    }
}

function Login() {
    const handleLogin = (e) => {
        e.preventDefault();

        const username = $("#login-nick").val();
        const password = $("#login-password").val();

        // Gửi yêu cầu POST đến trang đăng nhập
        $.ajax({
            url: camquaytay_atob(api.authLogin),
            type: 'POST',
            data: { username: username, password: password },
            dataType: 'json',
            success: function (data) {
                // Kiểm tra dữ liệu JSON trả về
                if (data.result === "true") {
                    window.location.reload(); // Đăng nhập thành công
                } else {
                    alert('Thông tin đăng nhập không chính xác');
                }
            },
            error: function () {
                alert('Đã xảy ra lỗi khi gửi yêu cầu đăng nhập');
            }
        });
    };

    return (
        <>
            <div className="phdr">
                <i className="fa fa-sign-in" aria-hidden="true"></i> Đăng nhập
            </div>
            <div className="menu" style={{ padding: '2%' }}>
                <form id="login" onSubmit={handleLogin}>
                    <p>
                        <b>Tên đăng nhập:</b><br />
                        <input
                            className="w3-input"
                            id="login-nick"
                            placeholder="Tên đăng nhập"
                            type="text"
                            maxLength="32"
                        />
                    </p>
                    <p>
                        <b>Mật khẩu:</b><br />
                        <input
                            className="w3-input"
                            id="login-password"
                            placeholder="Mật khẩu"
                            type="password"
                            maxLength="32"
                        />
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <button type="submit" className="button">
                            Đăng nhập
                        </button>
                    </p>
                </form>
            </div>
        </>
    );
}


function Home() {
    return (
        <div>
            <BlogList />
            <CategoryList />
        </div>
    );
}
function Error404(text) {
    return (
        <div className="mainblock">
            <div className="phdr">
                <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> Lỗi
            </div>
            <div className="menu">{text}</div>
        </div>
    );
}
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            store: [],
            query: '',
            searchResults: [],
            categories: {},
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.fetchBlogList();
        this.fetchCategories();
    }

    async fetchBlogList() {
        try {
            const response = await fetch(camquaytay_atob(api.BlogList));
            const data = await response.json();
            this.setState({
                store: data,
            });
        } catch (error) {
            console.error('Error fetching blog data:', error);
        }
    }

    async fetchCategories() {
        try {
            const response = await fetch(camquaytay_atob(api.CategoryList));
            const categories = await response.json();
            const categoriesMap = {};
            categories.forEach(category => {
                categoriesMap[category.id] = category.title;
            });
            this.setState({ categories: categoriesMap });
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    displaySearchResults() {
        const { searchResults, categories } = this.state;

        if (searchResults.length) {
            return searchResults.map(result => (
                <div className="list1" key={result.slug}>
                    {`[${categories[result.category]}] `}
                    <a href={`#/blog/${result.slug}`}>{result.title}</a>
                </div>
            ));
        } else {
            return <div className="menu">Không có kết quả</div>;
        }
    }

    handleSearchChange = event => {
        const query = event.target.value;
        this.setState({ query }, () => {
            this.search();
        });
    };

    search() {
        const { query, store } = this.state;

        if (query) {
            const normalizedQuery = query.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove diacritics
            const results = store.filter(blog =>
                blog.title
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics from titles
                    .toLowerCase()
                    .includes(normalizedQuery.toLowerCase())
            );

            this.setState({
                searchResults: results,
            });
        } else {
            this.setState({
                searchResults: [],
            });
        }
    }

    render() {
        const { query } = this.state;
        return (
            <div className="mainblock">
                <div className="phdr">
                    <i className="fa fa-search" aria-hidden="true"></i> Tìm kiếm trong trang
                </div>
                {query === '' ? (<div className="rmenu" style={{ border: 'none', margin: '0px', textAlign: 'center' }}>Vui lòng nhập từ khóa cần tìm</div>) : ''}
                <div className="gmenu" style={{ textAlign: 'center' }}>
                    <input
                        type="text"
                        id="search-input"
                        value={query}
                        onChange={this.handleSearchChange}
                    />
                </div>
                <div id="results-container">
                    {query === '' ? '' : (this.displaySearchResults())}
                </div>
            </div>
        );
    }
}

//category
class CategoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
    }

    componentDidMount() {
        $.ajax({
            url: camquaytay_atob(api.CategoryList),
            dataType: 'json',
            success: (data) => {
                this.setState({ categories: data });
            },
            error: (xhr, status, err) => {
                console.error(status, err.toString());
            }
        });
    }

    render() {
        const { categories } = this.state;

        return (
            <div className="mainblock">
                <div className="phdr" style={{ fontWeight: '700' }}>
                    <i className="fa fa-bars"></i> Chuyên mục
                </div>
                {categories.map((category, index) => (
                    <div className="list1" key={index}>
                        <a href={`#/category/${category.slug}`}>
                            <i className="fa fa-cube" aria-hidden="true"></i> {category.title}
                        </a> ({category.count})
                    </div>
                ))}
            </div>
        );
    }
}
class CategoryDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postCategory: {},
            blog: [],
            totalPages: 1,
            currentPage: 1,
        };
    }

    componentDidMount() {
        this.handleHashChange();
        window.addEventListener('hashchange', this.handleHashChange);
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange = () => {
        const hash = window.location.hash,
            slug = this.props.slug;
        const currentPageMatch = hash.match(/page=(\d+)/); // Tìm kiếm giá trị page trong hash
        const currentPage = currentPageMatch ? parseInt(currentPageMatch[1]) : 1; // Nếu không tìm thấy, mặc định là 1
        this.setState({ currentPage }, () => {
            this.fetchCategoryDetail(slug);
        });
        console.log('slug: ' + slug + '; page hien tai: ' + currentPage);
    };

    fetchCategoryDetail(slug) {
        const { currentPage } = this.state;
        fetch(`${camquaytay_atob(api.CategoryDetail)}?slug=${slug}&per=15&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    postCategory: data.stats.info,
                    blog: data.list,
                    totalPages: parseInt(data.stats.page_max),
                });

            })
            .catch(error => {
                console.error('Error fetching category detail:', error);
            });
    }

    render() {
        const { blog, postCategory, currentPage, totalPages } = this.state;

        return (
            <div className="mainblock">
                <div className="phdr">
                    <a href="#/">
                        <i className="fa fa-home" aria-hidden="true"></i>
                    </a>{" / "}
                    <a href="#/category">Thể loại</a>{" / "}
                    <a href={`#/category/${postCategory.slug}`}>{postCategory.title}</a>
                </div>
                {blog.map((post, index) => (
                    <div className="list1" key={index}>
                        <i className="fa fa-angle-right" aria-hidden="true"></i>{" "}
                        <a href={`#/blog/${post.slug}`}>
                            {post.title}
                        </a>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div dangerouslySetInnerHTML={{ __html: paging('#/category/' + postCategory.slug + '/?page=', currentPage, totalPages, '') }} />
                )}
            </div>
        );
    }
}

//blog
class BlogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blog: [],
            categories: {},
            totalPages: 1,
            currentPage: 1,
        };
    }

    componentDidMount() {
        window.addEventListener('hashchange', this.handleHashChange);
        this.fetchCategories();
        this.handleHashChange(); // Gọi handleHashChange khi component được mount để cập nhật currentPage ban đầu
    }

    componentWillUnmount() {
        window.removeEventListener('hashchange', this.handleHashChange);
    }

    handleHashChange = () => {
        const hash = window.location.hash;
        const currentPageMatch = hash.match(/page=(\d+)/); // Tìm kiếm giá trị page trong hash
        const currentPage = currentPageMatch ? parseInt(currentPageMatch[1]) : 1; // Nếu không tìm thấy, mặc định là 1
        this.setState({ currentPage }, () => {
            this.fetchBlogPosts();
        });
    };

    fetchCategories() {
        fetch(camquaytay_atob(api.CategoryList))
            .then(response => response.json())
            .then(categories => {
                const categoriesMap = {};
                categories.forEach(category => {
                    categoriesMap[category.id] = category.title;
                });
                this.setState({ categories: categoriesMap });
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }

    fetchBlogPosts() {
        const { currentPage } = this.state;
        fetch(`${camquaytay_atob(api.BlogPaging)}?per=15&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    blog: data.list,
                    totalPages: parseInt(data.stats.page_max),
                });
            })
            .catch(error => {
                console.error('Error fetching blog posts:', error);
            });
    }

    render() {
        const { blog, categories, currentPage, totalPages } = this.state;

        return (
            <div className="mainblock">
                <div className="phdr" style={{ fontWeight: '700' }}>
                    <i className="fa fa-book" aria-hidden="true"></i> Mới cập nhật
                </div>
                {blog.map((post, index) => (
                    <div className="list1" key={index}>
                        <span>[{categories[post.category]}] </span>
                        <a href={`#/blog/${post.slug}`}>
                            {post.title}
                        </a>
                    </div>
                ))}

                {totalPages > 1 && (
                    <div dangerouslySetInnerHTML={{ __html: paging('#/blog/?page=', currentPage, totalPages, '') }} />
                )}
            </div>
        );
    }
}
function BlogDetail({ slug }) {
    const [post, setPost] = React.useState(null);
    const [blog, setBlog] = React.useState(null);
    const [categoryMap, setCategoryMap] = React.useState({});
    const [loading, setLoading] = React.useState(true);
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        // Kiểm tra đăng nhập
        checkLoginStatus((status) => {
            setIsLoggedIn(status);
        });

        // Lấy dữ liệu bài đăng từ API
        fetch(`${camquaytay_atob(api.BlogContent)}?slug=${slug}`)
            .then(response => {
                if (response.status === 200) {
                    return response.text();
                } else if (response.status === 404) {
                    console.log('Bài viết không tồn tại');
                    setLoading(false);
                }
                console.log('Lỗi khi lấy dữ liệu bài viết');
                setLoading(false);
            })
            .then(postContent => {
                setPost(postContent);
                setLoading(false);
            })
            .catch(error => {
                console.log('Error fetching post content:', error);
                setLoading(false);
            });

        // Lấy danh sách bài viết từ API
        fetch(camquaytay_atob(api.BlogList))
            .then(response => response.json())
            .then(blogList => {
                const selectedBlog = blogList.find(item => item.slug === slug);
                if (selectedBlog) {
                    setBlog(selectedBlog);
                } else {
                    console.log('Không tìm thấy bài viết');
                }
            })
            .catch(error => {
                console.log('Error fetching blog list:', error);
            });

        // Lấy danh sách chuyên mục từ API
        fetch(camquaytay_atob(api.CategoryList))
            .then(response => response.json())
            .then(categories => {
                const categoriesMap = {};
                categories.forEach(category => {
                    categoriesMap[category.id] = category;
                });
                setCategoryMap(categoriesMap);
            })
            .catch(error => {
                console.log('Error fetching categories:', error);
            });
    }, [slug]);

    const [formattedPost, setFormattedPost] = React.useState(null);

    React.useEffect(() => {
        if (post) {
            const formatted = bbcode(post);
            setFormattedPost(formatted);
        }
    }, [post]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post || !blog || !categoryMap[blog.category]) {
        return Error404('Không tìm thấy bài viết');
    }

    const postCategory = categoryMap[blog.category];

    return (
        <>
            {isLoggedIn && (
                <div className="mainblock">
                    <div className="menu">
                        <b>
                            <i className="fa fa-wrench" aria-hidden="true"></i> Công cụ:
                        </b>{" "}
                        &emsp;&emsp;{" "}
                        <a href={`#/manager/p/blog/edit?id=${blog.id}`}>
                            <i className="fa fa-pencil-square-o" aria-hidden="true"></i> Chỉnh sửa
                        </a>{" / "}
                        <a href={`#/manager/p/blog/delete?id=${blog.id}`}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i> Xoá
                        </a>
                    </div>
                </div>
            )}
            <div className="mainblock">
                <div className="phdr">
                    <a href="#/">
                        <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
                    </a>{" / "}
                    <a href="#/category">Thể loại</a>{" / "}
                    <a href={`#/category/${postCategory.slug}`}>{postCategory.title}</a>
                </div>
                <div className="menu">
                    <div style={{ textAlign: "center", marginBottom: "5px" }}>
                        <h1 style={{ fontSize: "24px", fontWeight: "700" }}>{blog.title}</h1>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: formattedPost }} />
                </div>
            </div>
        </>
    );
}

// Router
function Index() {
    const [content, setContent] = React.useState(null);

    React.useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            const url = new URL(hash, window.location.origin);
            const params = new URLSearchParams(url.search);

            checkLoginStatus((status) => {
                if (hash.includes('#/manager/p')) {
                    if (status === false) {
                        window.location.href = '#/manager'
                    }
                }
            });

            if (hash === '#/manager') {
                setContent(<Manager />);
            } else if (hash === '#/manager/p/category/creator') {
                setContent(<ManagerCategoryCreator />);
            } else if (hash.startsWith('#/manager/p/category/delete?id=')) {
                const category_id = hash.slice('#/manager/p/category/delete?id='.length); // Lấy ID category
                setContent(<ManagerCategoryDelete id={category_id} />);
            } else if (hash === '#/manager/p/blog/creator') {
                setContent(<ManagerBlogCreator />);
            } else if (hash.startsWith('#/manager/p/blog/edit?id=')) {
                const blog_id = hash.slice('#/manager/p/blog/edit?id='.length); // Lấy ID blog
                setContent(<ManagerBlogEdit id={blog_id} />);
            } else if (hash.startsWith('#/manager/p/blog/delete?id=')) {
                const blog_id = hash.slice('#/manager/p/blog/delete?id='.length); // Lấy ID blog
                setContent(<ManagerBlogDelete id={blog_id} />);
            } else if (hash.startsWith('#/category')) {
                const slug = hash.slice('#/category/'.length); // Lấy phần slug từ hash
                fetch(camquaytay_atob(api.CategoryList)) // Thay thế bằng URL thực tế
                    .then(response => response.json())
                    .then(data => {
                        const categoryExists = data.some(category => category.slug === slug);
                        if (categoryExists) {
                            setContent(<CategoryDetail slug={slug} />);
                        } else {
                            setContent(<CategoryList />);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching category list:', error);
                    });
            } else if (hash.startsWith('#/blog')) {
                const slug = hash.slice('#/blog/'.length);
                fetch(camquaytay_atob(api.BlogList)) // Thay thế bằng URL thực tế
                    .then(response => response.json())
                    .then(data => {
                        const categoryExists = data.some(category => category.slug === slug);
                        if (categoryExists) {
                            setContent(<BlogDetail slug={slug} />);
                        } else {
                            setContent(<BlogList />);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching blog list:', error);
                    });
            } else if (hash.startsWith('#/search')) {
                setContent(<Search />);
            } else {
                setContent(<Home />);
            }
        };

        // Thêm event listener vào sự kiện hashchange
        window.addEventListener('hashchange', handleHashChange);

        // Gọi hàm handleHashChange ban đầu để đảm bảo nội dung khớp với URL hash ban đầu
        handleHashChange();

        // Dọn dẹp event listener khi component unmount
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    return (
        <div>
            {content}
        </div>
    );
}

// App Output
function App() {
    const containerStyle = {
        backgroundColor: '#f9f9f9',
        color: '#000',
        padding: '5px',
        borderStyle: 'solid',
        borderColor: '#1b1b2f',
        textAlign: 'center',
    },
        footerStyle = {
            backgroundColor: '#242c33',
            color: '#fff',
            paddingTop: '5px',
            paddingBottom: '5px',
            borderBottom: '3px dashed #1b1e25',
            textAlign: 'center',
            marginTop: '5px',
            paddingLeft: '5px',
            borderBottomRightRadius: '1px',
            borderBottomLeftRadius: '1px',
            border: '0px solid #39434D',
        };

    return (
        <>
            <div style={containerStyle}>
                <a href="#/">
                    <img src={app_logo} className="isLogo" alt="Logo" />
                </a>
            </div>

            <div style={{ backgroundColor: '#000000cc', paddingBottom: '4px', borderColor: '#ffffff' }} align="center">
                <table width="100%" cellPadding="0" cellSpacing="0">
                    <tr>
                        <td width="33%">
                            <div style={{ borderWidth: '3px', borderColor: '#ffffff', paddingLeft: '2px', padding: '8px' }} align="center">
                                <a href="#/category" title="Chuyên mục" style={{ color: '#FFFFFF' }}>
                                    <b>
                                        <i className="fa fa-bars"></i>
                                    </b>
                                </a>
                            </div>
                        </td>
                        <td width="34%">
                            <div
                                style={{ backgroundColor: '#ffffff', borderWidth: '1px', borderColor: '#fa6c5f', padding: '8px' }}
                                align="center"
                            >
                                <a href="#/" title="Trang Chủ" style={{ color: '#000' }}>
                                    <b>
                                        <i className="fa fa-home" aria-hidden="true"></i>
                                    </b>
                                </a>
                            </div>
                        </td>
                        <td width="33%">
                            <div style={{ borderWidth: '3px', borderColor: '#ffffff', paddingLeft: '2px', padding: '8px' }} align="center">
                                <a href="#/search" title="Tìm kiếm" style={{ color: '#FFFFFF' }}>
                                    <b>
                                        <i className="fa fa-search" aria-hidden="true"></i>
                                    </b>
                                </a>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            <div className="mainblock">
                <div className="phdr" style={{ fontWeight: 700 }}>
                    <i className="fa fa-bullhorn" aria-hidden="true"></i> Thông báo
                </div>
                <div className="menu">
                    AE chú ý! Từ <strong><span style={{ color: 'red' }}>2023</span> CamQuayTay.Com</strong> chuyển sang hoạt động với địa chỉ mới là <a href="https://protein.sacmau.mobi">Protein.SacMau.Mobi</a>!
                </div>
                <div className="menu">
                    Vì điều luật của SMM, nên CamQuayTay chỉ đăng tải các bài viết kín, không quá sexy. Hình ảnh và phim chỉ mang tính giáo dục giới tính qua câu chuyện từng trải của các nhân vật hư cấu, không nhằm tuyên truyền các nội dung khiêu dâm, đồi trụy.
                </div>
            </div>

            <Index />

            <div style={footerStyle}>
                <i className="fa fa-copyright"></i> {app_made} <i className="fa fa-free-code-camp" aria-hidden="true"></i> <a href="#/manager" style={{ color: '#fff' }}>{app_name}</a>
            </div>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));